import * as React from 'react';

export const SocketContext = React.createContext<SocketIOClient.Socket | undefined>(undefined);

export default SocketContext;
