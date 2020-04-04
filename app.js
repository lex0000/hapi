/**
 * Created by uzysjung on 17. 12. 13..
 */

'use strict';
const Hapi = require('@hapi/hapi');
const Path = require('path');
const config = require('./src/helpers/config');
const Joi = require('@hapi/joi');
const server = new Hapi.Server({ 
  port: config.port,
  routes: { cors: true, jsonp: 'callback' }
});


const main = async () => {
  try { 
    await Promise.all([require('./src/plugins/inert')(server), require('./src/plugins/vision')(server)]);
    // await require('./src/plugins/scooter')(server);
    // await require('./src/plugins/bassmaster')(server);
    // await require('./src/plugins/h2o2')(server);
    // await require('./src/plugins/therealyou')(server);
    // await require('./src/plugins/hapi-auth-basic')(server);
    // await require('./src/plugins/hapi-swagger')(server);\
    

  //   server.register({
  //     plugin: require('hapi-swagger'),
  //     options: {
  //         //basePath: config.SWAGGER_URL,
  //         info : {
  //             title   : require('./package').name,
  //             description : require('./package').description,
  //             version : require('./package').version
  //         },
  //         auth: 'simple',
  //         jsonEditor : true
  
  //     }
  // });
    

  server.route({
    path: '/foobar/test',
    method: 'GET',
    options: {
      tags: ['api'],
      description: 'My route description',
      notes: 'My route notes',
      handler (request, h) {
        return {
          "id":1
        };
      }
    }
  }); 
  
  server.route({
    path: '/foobar/{foo}/{bar}',
    method: 'POST',
    options: {
      tags: ['api'],
      validate: {
        params: {
          foo: Joi.string().required().description('test'),
          bar: Joi.string().required()
        }
      },
      handler (request,h) {
        //console.log(Joi.string().required().description('test'))
        return request.payload;
      }
    }
  });


    server.route(require('./src/routes/default'));

    server.route({
      method: 'GET',
      path: '/public/{path*}',
      handler: {
        directory: { path: './public/', redirectToSlash: true }
      }
    });

    server.route({
      method: 'GET',
      path: '/sexy',
      handler: function (request, h) {
        console.log('g', h)
        return h.file('./public/sexy.jpg');
      }
    });

    await server.start();

    console.log(['info', 'server'], 'Server environment: ' + config.type);
    console.log(['info', 'server'], 'Server running at: ' + server.info.uri);

  } catch (e) {
    console.error(['error', 'server'], 'Server Error Occured' + e);
    console.error('stack - ', e.stack);
  }
  return server;
};
main();

process.on('SIGINT', async () => {
  try {
    if (config.type !== 'development') {
      console.log('Gaia Hapi stoppping Hapi');
      await server.stop({ timeout: 1000 });
    }
  } catch (e) {
    console.error(e);
  }
  console.log('Gaia Hapi stopped');
  return process.exit(0);
});


module.exports = exports = server;

