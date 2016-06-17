
module.exports = function(ctx, cb) {
  return cb(null, "Your input: " + JSON.stringify(ctx.data) + "\n");
}
