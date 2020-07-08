/**
 * Helper function to throw errors based on @common/node-error-handling
 * @param {String, Error} message it can be either String or Error
 * @param {String} code see responseCodes.dictionary.json
 * @param {String} severity LOW | MEDIUM | HIGH
 */

function throwError(error, code, severity='LOW') {
  if (error instanceof Error ) {
    throw error;
  } else {
    const err = new Error(error);
    err.code = code;
    err.severity = severity;
    throw err;
  }
}

module.exports = throwError;

