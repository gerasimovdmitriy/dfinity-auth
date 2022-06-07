export default ({ IDL }) => {
  const TxReceipt = IDL.Variant({
    'Ok' : IDL.Nat,
    'Err' : IDL.Variant({
      'InsufficientAllowance' : IDL.Null,
      'InsufficientBalance' : IDL.Null,
      'ErrorOperationStyle' : IDL.Null,
      'Unauthorized' : IDL.Null,
      'LedgerTrap' : IDL.Null,
      'ErrorTo' : IDL.Null,
      'Other' : IDL.Text,
      'BlockUsed' : IDL.Null,
      'AmountTooSmall' : IDL.Null,
    }),
  });
  return IDL.Service({
    'canisterTokenBalance' : IDL.Func([], [IDL.Nat], []),
    'evacuateTokens' : IDL.Func([IDL.Principal, IDL.Nat], [TxReceipt], []),
    'getBotMassenger' : IDL.Func([], [IDL.Principal], ['query']),
    'getFee' : IDL.Func([], [IDL.Nat], ['query']),
    'getOwner' : IDL.Func([], [IDL.Principal], ['query']),
    'init' : IDL.Func([IDL.Principal, IDL.Nat, IDL.Principal], [], ['oneway']),
    'performBridgingToStart' : IDL.Func(
      [IDL.Nat, IDL.Principal],
      [TxReceipt],
      [],
    ),
    'requestBridgingToEnd' : IDL.Func(
      [IDL.Nat, IDL.Principal],
      [TxReceipt],
      [],
    ),
    'setBotMassenger' : IDL.Func([IDL.Principal], [IDL.Bool], []),
    'setFee' : IDL.Func([IDL.Nat], [IDL.Bool], []),
    'setOwner' : IDL.Func([IDL.Principal], [IDL.Bool], []),
  });
};
export const init = ({ IDL }) => { return []; };