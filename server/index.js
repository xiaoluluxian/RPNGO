/**
 * @author WMXPY
 * @namespace GO
 * @description Index
 */

const { SudooExpress, SudooExpressApplication } = require('@sudoo/express');
const { readTextFile } = require('@sudoo/io');
const Path = require('path');

const setting = SudooExpressApplication.create('GO-UI', '1');

const app = SudooExpress.create(setting);

// Health
app.health('/health');

app.static(Path.join(__dirname, '..', 'dist'));

