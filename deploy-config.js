module.exports = function() {
    'use strict';

    var env = process.env.NODE_ENV || 'development';

    switch (env) {

        case 'development':
            return {
                rsync: {
                    dest: ''
                }
            };
    }
};
