/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useEffect, useState } from 'react';

import { Navigate } from 'react-router-dom';

import getConfig from 'app/config';
import {
  useProfile,
  useProfileAvatar,
  useProfileBackground,
} from 'app/hooks/Profile/useProfile';
import { getNonce, signCerty } from 'app/services/authService';
import { WalletConnection, connect, keyStores } from 'near-api-js';

// const nearConfig = getConfig(process.env.NODE_ENV || 'development');
const nearConfig = getConfig('development');

nearConfig.keyStore = new keyStores.BrowserLocalStorageKeyStore();

const NearContext = createContext<any>(undefined);

const NearProvider = ({ children }) => {
  const [wallet, setWallet] = useState<any>(undefined);
  const [account, setAccount] = useState('');
  const { refetchDataProfileAvatar } = useProfileAvatar();
  const { refetchDataProfileBackground } = useProfileBackground();
  const { refetchDataProfile } = useProfile();

  // connect to NEAR
  const connectNear = async () => {
    const near = await connect(nearConfig);
    const walletConnection = new WalletConnection(near, '');

    const accountId = walletConnection.getAccountId();

    setWallet(walletConnection);
    setAccount(accountId);

    const token = localStorage.getItem('Near_token_bearer');

    if (walletConnection.isSignedIn() && !token) {
      const nonce = await getNonce(accountId).then(result => {
        return result.data.data.nonce;
      });

      const keyPair: any = await walletConnection._keyStore.getKey(
        'testnet',
        accountId,
      );

      if (!keyPair) {
        return {
          data: null,
        };
      }

      const message = await Buffer.from(nonce);
      const signed = keyPair.sign(message);
      const signature = Buffer.from(signed.signature).toString('base64');

      const tokenAccess = await signCerty({
        accountId: accountId,
        signature,
        publicKey: keyPair.getPublicKey().toString(),
      }).then(res => res.data.data);
      localStorage.setItem('Near_token_bearer', tokenAccess.accessToken);
      localStorage.setItem('REFRESH_TOKEN', tokenAccess.refreshToken);

      refetchDataProfileAvatar();
      refetchDataProfileBackground();
      refetchDataProfile();
    }
  };

  useEffect(() => {
    connectNear();
  }, []);

  const dispatchReset = () => {
    // setWallet(undefined);
    setAccount('');
    return <Navigate to="/jobs" replace />;
  };

  return (
    <NearContext.Provider value={{ wallet, account, dispatchReset }}>
      {children}
    </NearContext.Provider>
  );
};

export { NearProvider, NearContext };
