import axios from 'axios'
import config from './config'

import socket from './component/socket'


const $http = axios.create({
    baseURL: config.server.baseURL,
    headers: {
        "Content-Type": "application/json",
        // "X-Socket-ID": s
    },
    withCredentials: true
})
socket.on('connect', res=>{
    console.log(socket.id);
    $http.defaults.headers.common['X-Socket-ID'] = socket.id
});

// Authentikasi
const authLogin = (username, password) => {
    return $http.post(config.server.api + '/login', {
        username: username,
        password: password
    })
        .then(successHandler)
        .catch(errorHandler);
}
const authCek = (username, password) => {
    return $http.get(config.server.api + '/cek_status')
        .then(successHandler)
        .catch(errorHandler);
}
const authLogout = (username, password) => {
    return $http.get(config.server.api + '/logout')
        .then(successHandler)
        .catch(errorHandler);
}


const ambilItems = (params) => {
    return $http.get(config.server.admin + '/ambil_items', {
        params
    })
        .then(successHandler);
}
const ambilPesanan = () => {
    return $http.get(config.server.admin + '/ambil_pesanan')
        .then(successHandler);
}
const ambilPengguna = () => {
    return $http.get(config.server.admin + '/ambil_pengguna')
        .then(successHandler);
}
const ambilRekapPesanan = (dari_tanggal, sampai_tanggal) => {
    return $http.get(config.server.admin + '/ambil_rekap_pesanan', {
        params: {
            dari_tanggal,
            sampai_tanggal
        }
    })
        .then(successHandler)
        .catch(errorHandler);
}

const updatePesananAdd = (no_nota, no_meja, id_item, jumlah_pesanan) => {
    return $http.post(config.server.admin + '/update_pesanan', {
        action: 'ADD',
        no_nota,
        no_meja,
        no_urut: no_nota.split('/')[1],
        id_item,
        jumlah_pesanan
    })
        .then(successHandler)
        .catch(errorHandler);
}
const updatePesananUpdate = (id_pesanan, no_nota, id_item) => {
    return $http.post(config.server.admin + '/update_pesanan', {
        action: 'UPDATE',
        id_pesanan,
        no_nota,
        id_item
    })
        .then(successHandler)
        .catch(errorHandler);
}
const updatePesananDelete = (id_pesanan, no_nota) => {
    return $http.post(config.server.admin + '/update_pesanan', {
        action: 'DELETE',
        id_pesanan,
        no_nota
    })
        .then(successHandler)
        .catch(errorHandler);
}


const cariItems = (nama_item) => {
    return $http.get(config.server.admin + '/cari_items', {
        params: {
            nama_item
        }
    })
        .then(successHandler)
        .catch(errorHandler);
}

const donePesanan = (id_pesanan, no_nota) => {
    return $http.post(config.server.admin + '/done_pesanan', {
        id_pesanan,
        no_nota
    })
        .then(successHandler)
        .catch(errorHandler);
}
const prosesPesanan = (id_pesanan, no_nota) => {
    return $http.post(config.server.admin + '/proses_pesanan', {
        id_pesanan,
        no_nota
    })
        .then(successHandler)
        .catch(errorHandler);
}
const bayarPesanan = (no_nota) => {
    return $http.post(config.server.admin + '/bayar_pesanan', { no_nota })
        .then(successHandler)
        .catch(errorHandler);
}
const pesanItems = (obj) => {
    return $http.post(config.server.admin + '/pesan_items', obj)
        .then(successHandler)
        .catch(errorHandler);
}

const successHandler = res => {
    return res.data;
};
const errorHandler = res => {
    console.log('error');
    console.log(res);
    return res;
};

export default {
    $http,
    ambil: {
        pesanan: ambilPesanan,
        rekapPesanan: ambilRekapPesanan,
        items: ambilItems,
        pengguna: ambilPengguna
    },
    auth: {
        login: authLogin,
        cek: authCek,
        logout: authLogout
    },
    update: {
        pesanan: {
            add: updatePesananAdd,
            update: updatePesananUpdate,
            delete: updatePesananDelete
        }
    },
    prosesPesanan,
    donePesanan,
    bayarPesanan,
    pesanItems,
    cariItems
};