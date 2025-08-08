// ----  url versioning  ----
const urlVersioning = (version) => (req, res, next) => {
  if (req.path.startsWith(`/api/${version}`)) {
    next();
  } else {
    res.status(404).json({
      success: false,
      error: "API version is not supported",
    });
  }
};

//  --- headers versioning -----
const headerVersioning = (version) => (req, res, next) => {
  if (req.get("Accept-Version") === version) {
    next();
  } else {
    res.status(404).json({
      success: false,
      error: "API version is not supported",
    });
  }
};

// --- Content-Type----
//application/json --> application/vnd.api.v1 + json
const contentTypeVersioning = (version) => (req, res, next) => {
  const contentType = req.get("Content-Type");
  if (
    contentType &&
    contentType.includes(`application/vnd.api.${version}+json`)
  ) {
    next();
  } else {
    res.status(404).json({
      success: false,
      error: "API version is not supported",
    });
  }
};

//-----
module.exports = { urlVersioning, headerVersioning, contentTypeVersioning };
