module.exports = async (ctx) => {
  const images = await ctx.mpserverless.db.collection('things').find({ owner: ctx.args.username });
  return { images };
};