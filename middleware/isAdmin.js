import createError from 'http-errors';

export const isAdmin = (req, res, next) => {
  if (req.user.clearance !== 'admin')
    
    next(createError(401, `Your user doesn't have access to this dataset`));

  next();
};
