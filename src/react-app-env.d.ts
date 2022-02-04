/// <reference types="react-scripts" />

// doesn't look like these libraries have types (YET! Looks like as of dec 31, 2021 the kepler repo is pushing out types!)
declare module 'kepler.gl/reducers';
declare module 'kepler.gl/middleware';
declare module 'kepler.gl';
declare module 'react-palm/tasks';
declare module 'kepler.gl/actions';
// haha found out you can do this... that took a second haha...
declare module 'kepler.gl/*';
// declare module 'react-virtualized/dist/commonjs/AutoSizer';