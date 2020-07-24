# Taken from https://github.com/polkawallet-io/polkawallet-RN/blob/master/postinstall.sh

# code injection
sed -i -e $'s/var randomBytes = require(\'randombytes\')*/var randomBytes = require(\'crypto\').randomBytes/g' ./node_modules/bip39/src/index.js

# node modules shim
# All shims are now applied via babel.config.js
