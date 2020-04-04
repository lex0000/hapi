'use strict';

const Hapi = require('@hapi/hapi');

const init = async () => {

    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });

     // Redirect all the other resquests
    // this.app.get('*', (req: Request, res: Response) => {
    //   if (allowedExt.filter(ext => req.url.indexOf(ext) > 0).length > 0) {
    //     res.sendFile(path.resolve(`../backend/dist/backend/${req.url}`));
    //   } else {
    //     res.sendFile(path.resolve('../backend/dist/backend/index.html'));
    //   }
    // });

    server.route({
        method: 'GET',
        path: '/',
        handler: (request, h) => {

            return 'Hello World!';
        }
    });

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();


// // 'use strict';

// // const Hapi = require('hapi');
// // const Hoek = require('hoek');
// // const Settings = require('./settings/');

// // const server = new Hapi.Server({  
// //     host: Settings.host,
// //     port: Settings.port
// //   });

// // server.route({
// //   method: 'GET',
// //   path: '/',
// //   handler: (request, reply) => {
// //     reply('Hello, world!');
// //   }
// // });

// // server.start((err) => {
// //   Hoek.assert(!err, err);
// //   console.log(`Server running at: ${server.info.uri}`);
// // });

// // 'use strict';
// // const Hapi = require('@hapi/hapi');
// // const Settings = require('./settings/');
// // const init = async () => {
// //     const server = Hapi.server({
// //         port: Settings.port,
// //         host: Settings.host
// //     });
// //     await server.start();
// //     console.log('Server running on %s', server.info.uri);
// // };
// // process.on('unhandledRejection', (err) => {
// //     console.log(err);
// //     process.exit(1);
// // });
// // init();

// 'use strict';
// const Hapi = require('@hapi/hapi');
// const Settings = require('./settings/');

// console.log(Settings);


// // process.on('unhandledRejection', (err) => {

// //     console.log(err);
// //     process.exit(1);
// // });

// // init();