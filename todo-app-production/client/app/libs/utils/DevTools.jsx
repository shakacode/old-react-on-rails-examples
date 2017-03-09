/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { createDevTools } from 'redux-devtools';
import LogMonitor from 'redux-devtools-log-monitor';
import Dispatcher from 'redux-devtools-dispatch';
import MultipleMonitors from 'redux-devtools-multiple-monitors';
import SliderMonitor from 'redux-slider-monitor';
import DiffMonitor from 'redux-devtools-diff-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';
import ChartMonitor from 'redux-devtools-chart-monitor';

import * as todoActionCreators from 'todosIndex/actions/todos';
import * as formActionCreators from 'todosIndex/actions/forms';

export default createDevTools(
  <DockMonitor toggleVisibilityKey="ctrl-h" changePositionKey="ctrl-q" changeMonitorKey="ctrl-m">
    <ChartMonitor />
    <LogMonitor />
    <DiffMonitor />
  </DockMonitor>,
);

/*
    // ref errors
    <Dispatcher actionCreators={{ todos: todoActionCreators, forms: formActionCreators }} initEmpty />
    <SliderMonitor keyboardEnabled />
*/

// TODO: add inspector and upgrade log-monitor to filterable-log-monitor
