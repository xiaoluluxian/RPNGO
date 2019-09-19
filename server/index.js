/**
 * @author RPN-IT
 * @namespace GO
 * @description Index
 */

const { SudooExpress, SudooExpressApplication } = require('@sudoo/express');
const Path = require('path');

const setting = SudooExpressApplication.create('GO-UI', '1');

const app = SudooExpress.create(setting);

// Health
app.health('/health');

app.static(Path.join(__dirname, '..', 'dist'));

app.host(8080);
console.log('Hosting at port 8080');
