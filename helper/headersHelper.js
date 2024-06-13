/**
 * Sets common headers for an Express response.
 *
 * @param {Object} res - Express response object.
 * @param {Object} options - Options object to set custom headers.
 */

export function setResponseHeaders(res, options = {}) {
  res.set("Content-Type", "application/json");
}