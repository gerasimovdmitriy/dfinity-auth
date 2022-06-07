import { Actor, HttpAgent } from '@dfinity/agent';
import { Principal } from '@dfinity/principal';
import { AuthClient } from '@dfinity/auth-client';

const signInBtn = document.getElementById('signinBtn');
const signOutBtn = document.getElementById('signoutBtn');
const whoamiBtn = document.getElementById('whoamiBtn');
const hostUrlEl = document.getElementById('hostUrl');
const whoAmIResponseEl = document.getElementById('whoamiResponse');
const canisterIdEl = document.getElementById('canisterId');
const principalEl = document.getElementById('principal');
const idpUrlEl = document.getElementById('idpUrl');

let authClient;

let publicKey;

console.log("ererer")
const init = async () => {
  authClient = await AuthClient.create();
  principalEl.innerText = await authClient.getIdentity().getPrincipal();
  console.log("ererer2")
  // Redirect to the identity provider
  signInBtn.onclick = async () => {
    publicKey = await window.ic.plug.requestConnect();
    console.log(`The connected user's public key is:`, publicKey);
  };

  signOutBtn.onclick = async () => {
    authClient.logout();
  };
};

init();

whoamiBtn.addEventListener('click', async () => {
  publicKey = await window.ic.plug.requestConnect();
  console.log(`The connected user's public key is:`, publicKey);
});
