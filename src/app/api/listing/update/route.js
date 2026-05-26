import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb/mongoose';
import Listing from '@/lib/models/listing.model';
import { auth } from '@/lib/auth';
import slugify from 'slugify';

export async function PUT(request) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session) {
      return NextResponse.json({ error: 'Unauthorised' }, { status: 401 });
    }

    await connectDB();
    const body = await request.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json(
        { error: 'Listing ID is required' },
        { status: 400 }
      );
    }

    // Regenerate slug if title changed
    if (updates.title) {
      updates.slug = slugify(updates.title, {
        lower: true,
        strict: true,
      });
    }

    const listing = await Listing.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true } // return updated document
    );

    if (!listing) {
      return NextResponse.json(
        { error: 'Listing not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(listing);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}