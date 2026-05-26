import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb/mongoose';
import Listing from '@/lib/models/listing.model';
import { auth } from '@/lib/auth';
import slugify from 'slugify';

export async function POST(request) {
  try {
    // Check session — only admins can create
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session) {
      return NextResponse.json({ error: 'Unauthorised' }, { status: 401 });
    }

    await connectDB();
    const body = await request.json();

    // Generate SEO slug from title
    const slug = slugify(body.title, {
      lower: true,
      strict: true,
    });

    // Check slug doesn't already exist
    const existing = await Listing.findOne({ slug });
    if (existing) {
      return NextResponse.json(
        { error: 'A listing with this title already exists' },
        { status: 400 }
      );
    }

    const listing = await Listing.create({
      ...body,
      slug,
      postedBy: [session.user.id],
    });

    return NextResponse.json(listing, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}