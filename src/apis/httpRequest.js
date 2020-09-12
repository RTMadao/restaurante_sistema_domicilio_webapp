import { Http } from 'vue-resource'
import { urlApiApp, urlApiAuth } from '@/config.js'

class Peticiones {
  authenticate (user, filtro) {
    return new Promise((resolve, reject) => {
      Http.post(`${urlApiAuth}${filtro}`, user)
        .then(respuesta => {
          resolve(respuesta.body)
        })
        .catch(err => {
          reject(err.body.error)
        })
    })
  }

  registrar (registro, namespace, filtro) {
    return new Promise((resolve, reject) => {
      Http.post(`${urlApiApp}${filtro}/${namespace}`, registro)
        .then(respuesta => {
          resolve(respuesta.body.mensaje)
        })
        .catch(err => {
          reject(err.body.mensaje)
        })
    })
  }

  listar (filtro) {
    return new Promise((resolve, reject) => {
      let lista
      Http.get(`${urlApiApp}${filtro}`)
        .then(response => {
          lista = response.body.lista
          resolve(lista)
        })
    })
  }

  generar (filtro, namespace, permiso) {
    return new Promise((resolve, reject) => {
      Http.get(`${urlApiApp}${filtro}/${namespace}`, permiso)
        .then(respuesta => {
          resolve(respuesta.body)
        })
    })
  }

  modificar (filtro, namespace, id, registro) {
    return new Promise((resolve, reject) => {
      Http.put(`${urlApiApp}${filtro}/${namespace}/${id}`, registro)
        .then(respuesta => {
          resolve(respuesta.body.mensaje)
        })
        .catch(err => {
          reject(err.body.mensaje)
        })
    })
  }

  eliminar (filtro, namespace, id) {
    return new Promise((resolve, reject) => {
      Http.delete(`${urlApiApp}${filtro}/${namespace}${id}`)
        .then(respuesta => {
          resolve(respuesta.body.mensaje)
        })
        .catch(err => {
          reject(err.body.mensaje)
        })
    })
  }
}

export const peticiones = new Peticiones()
