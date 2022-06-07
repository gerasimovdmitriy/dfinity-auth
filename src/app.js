// Elements list

import { Principal } from '@dfinity/principal';

import token from './token.did'
import bridge from './dfinity-bridge.did'
let TokenActor, BridgeActor;
const els = {};
const tokenCanister = 'oh7zz-gyaaa-aaaai-qfm3a-cai'
const bridgeCanister = 'oa67n-laaaa-aaaai-qfm3q-cai'
const whitelist = [
  tokenCanister,
  bridgeCanister
];

// Initialises the application listeners and handlers
function main() {
  // Assign elements to the elements list
  console.log("=-9876")
  console.log(Principal.fromText('oa67n-laaaa-aaaai-qfm3q-cai'))
  els.receiverPrincipalId = document.querySelector('#receiver-principal-id');
  els.amount = document.querySelector('#amount');
  els.btnConnect = document.querySelector('#btn-connect');
  els.btnIsConnected = document.querySelector('#btn-is-connected');
  els.btnRequestBalance = document.querySelector('#btn-request-balance');
  els.btnRequestTransfer = document.querySelector('#btn-request-transfer');
  els.output = document.querySelector('#output');

  // Initialise click listener for buttons
  Object
    .values(els)
    .filter((el) => el.nodeName === 'BUTTON')
    .forEach((el) => el.addEventListener(
        'click',
        onButtonPressHandler
      )
    )
}

// Button press handler
function onButtonPressHandler(el) {
  const name = el.target.id;

  switch(name) {
    case 'btn-connect':
      onBtnConnect();
      break;
    case 'btn-is-connected':
      onBtnIsConnected();
      break;
    case 'btn-request-balance':
      onBtnRequestBalance();
      break;
    case 'btn-request-transfer':
      onBtnRequestTransfer();
      break;
    default:
      outputWrite('Button not found!');
  };
}

// On button press connect handler
async function onBtnConnect() {
  try {
    outputWrite('onBtnConnect() call');
    const response = await window.ic?.plug?.requestConnect({whitelist});
    outputWrite(`onBtnConnect() call response ${response}`);
    TokenActor = await window.ic.plug.createActor({
      canisterId: tokenCanister,
      interfaceFactory: token,
    });
    BridgeActor = await window.ic.plug.createActor({
      canisterId: bridgeCanister,
      interfaceFactory: bridge,
    });
    const res2 = await TokenActor.getTokenFee()
    console.log(res2)
    outputWrite(`getTokenFee() call response ${JSON.stringify(res2)}`);
    const res3 = await TokenActor.canisterBalanceICP()
    //TokenActor.approve(Principal.fromText('oa67n-laaaa-aaaai-qfm3q-cai'), BigInt(100000000))
    console.log("=-o9iuyhnm")
    console.log(res3)
    outputWrite(`approve() call response ${JSON.stringify(res3)}`);
  }catch (e) {
    console.log(e)
  }
}

// On button press is connected handler
async function onBtnIsConnected() {
  outputWrite('onBtnIsConnected() call');
  const response = await window.ic?.plug?.isConnected();
  outputWrite(`onBtnIsConnected() call response ${response}`);
}

// On button press request balance handler
async function onBtnRequestBalance() {
  outputWrite('onBtnRequestBalance() call');
  const response = await window.ic?.plug?.requestBalance();
  outputWrite(`onBtnRequestBalance() call response ${JSON.stringify(response)}`);
}

// On button press request transfer handler
async function onBtnRequestTransfer() {
  outputWrite('onBtnRequestTransfer() call');
  const to = els.receiverPrincipalId?.value;
  const amount = Number(els.amount?.value.replaceAll('_', ''));
  const requestTransferArg = {
    to,
    amount,
  };

  if (!to) {
    outputWrite(`onBtnRequestTransfer() call failure, missing account id!`);
    return;
  };

  const response = await window.ic?.plug?.requestTransfer(requestTransferArg);
  outputWrite(`onBtnRequestTransfer() call response ${JSON.stringify(response)}`);
}

// Write to the output DOM element
function outputWrite(text) {
  els.output.textContent += (els.output.textContent ? `\n` : '') + `> ${text}`;
  els.output.scrollTop = els.output.scrollHeight;
}

// Receiver Principal ID getter
function getReceiverPrincipalId() {
  return els.receiverPrincipalId?.value;
}

// Calls the Main function when the document is ready
document.addEventListener("DOMContentLoaded", main);
