import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb/mongoose';
import Listing from '@/lib/models/listing.model';
import { auth } from '@/lib/auth';

export async function DELETE(request) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session) {
      return NextResponse.json({ error: 'Unauthorised' }, { status: 401 });
    }

    await connectDB();
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json(
        { error: 'Listing ID is required' },
        { status: 400 }
      );
    }

    const listing = await Listing.findByIdAndDelete(id);

    if (!listing) {
      return NextResponse.json(
        { error: 'Listing not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: 'Listing deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}