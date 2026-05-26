import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb/mongoose';
import Listing from '@/lib/models/listing.model';

export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();

    const {
      searchTerm,
      type,
      listingFor,
      status = 'active',
      location,
      minPrice,
      maxPrice,
      bedrooms,
      limit = 9,
      page = 1,
      sort = 'createdAt',
      order = 'desc',
    } = body;

    // Build query dynamically
    const query = {};

    if (searchTerm) {
      query.$text = { $search: searchTerm };
    }
    if (type) query.type = type;
    if (listingFor) query.listingFor = listingFor;
    if (status) query.status = status;
    if (bedrooms) query.bedrooms = { $gte: Number(bedrooms) };
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }
    if (location?.state) query['location.state'] = location.state;
    if (location?.city) query['location.city'] = location.city;
    if (location?.area) query['location.area'] = location.area;

    const skip = (Number(page) - 1) * Number(limit);
    const sortObj = { [sort]: order === 'desc' ? -1 : 1 };

    const [listings, total] = await Promise.all([
      Listing.find(query)
        .sort(sortObj)
        .limit(Number(limit))
        .skip(skip),
      Listing.countDocuments(query),
    ]);

    return NextResponse.json({
      listings,
      total,
      page: Number(page),
      totalPages: Math.ceil(total / Number(limit)),
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}