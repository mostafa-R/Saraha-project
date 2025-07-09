export async function paginate(model, filter = {}, option = {}) {
  const page = parseInt(option.page) || 1;
  const limit = parseInt(option.limit) || 10;
  const sort = option.sort || { createdAt: -1 };
  const select = option.select || "";

  if (isNaN(page) || isNaN(limit)) {
    const [data, total] = await Promise.all([
      model.find(filter).sort(sort).select(select),
      model.countDocuments(filter),
    ]);
    return { data, total };
  }

  const skip = (page - 1) * limit;

  const [data, total] = await Promise.all([
    model.find(filter).skip(skip).limit(limit).sort(sort).select(select),
    model.countDocuments(filter),
  ]);

  return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
}
