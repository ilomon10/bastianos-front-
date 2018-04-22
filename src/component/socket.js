import openSocket from 'socket.io-client'
import config from '../config'

const socket = openSocket(config.server.baseURL);

export default socket;