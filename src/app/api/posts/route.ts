import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { createClient } from '@supabase/supabase-js';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const N8N_API_SECRET = process.env.N8N_API_SECRET;

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!N8N_API_SECRET || authHeader !== `Bearer ${N8N_API_SECRET}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { title, slug, content, excerpt, tags, published } = body;

    if (!title || !slug || !content) {
      return NextResponse.json(
        { error: 'title, slug, and content are required' },
        { status: 400 }
      );
    }

    const { data: existing } = await supabaseAdmin
      .from('posts')
      .select('id')
      .eq('slug', slug)
      .single();

    if (existing) {
      return NextResponse.json(
        { error: `Bu slug artıq mövcuddur: "${slug}"` },
        { status: 409 }
      );
    }

    const { data, error } = await supabaseAdmin
      .from('posts')
      .insert({
        title,
        slug,
        excerpt: excerpt || '',
        content,
        cover_image: null,
        tags: tags || [],
        published: published !== undefined ? published : true,
      })
      .select()
      .single();

    if (error) {
      console.error('Supabase insert error:', error);
      return NextResponse.json(
        { error: 'Failed to create blog post', details: error.message },
        { status: 500 }
      );
    }

    // Cache temizle - yeni post derhal gorunsun
    revalidatePath('/blog', 'page');
    revalidatePath('/', 'page');

    return NextResponse.json(data, { status: 201 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('Blog API error:', message);
    return NextResponse.json(
      { error: 'Internal server error', details: message },
      { status: 500 }
    );
  }
}
