import Environment from '../../constants/Environment';

const { NODE_ENV, RAILS_ENV, SERVER_RENDERING } = process.env;

export const get = ENV_VAR => process.env[ENV_VAR];

export const isDev = NODE_ENV === Environment.DEV;
export const isTest = NODE_ENV === Environment.TEST;
export const isProduction = !!RAILS_ENV && RAILS_ENV === Environment.PRODUCTION;
export const isStaging = !!RAILS_ENV && RAILS_ENV === Environment.STAGING;
export const isProductionLike = !isDev && !isTest;
export const isServerRendering = SERVER_RENDERING;
