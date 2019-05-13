import bip39 from 'bip39'
import hdkey from 'hdkey'
import ethUtil from 'ethereumjs-util'
import toDate from "date-fns/esm/toDate"
import formatDistanceStrict from "date-fns/esm/formatDistanceStrict"
import prettyNum from "pretty-num"
import decode from "entity-decode"

export function generateAccount(mnemonic, password) {
  const seed = bip39.mnemonicToSeed(mnemonic, password)
  const root = hdkey.fromMasterSeed(seed)
  //const masterPrivateKey = root.privateKey.toString('hex')
  const addrNode = root.derive("m/44'/60'/0'/0/0")
  const pubKey = ethUtil.privateToPublic(addrNode._privateKey)
  const addr = ethUtil.publicToAddress(pubKey).toString('hex')
  const address = ethUtil.toChecksumAddress(addr)

  let account = {
    address: address,
    mnemonic: mnemonic,
    password: password
  }

  return account
}

export function getTimeDistance(timestamp) {
  const distance = formatDistanceStrict(toDate(timestamp), new Date(), {
    roundingMethod: "floor"
  })

  return distance && distance !== "Invalid Date" ? distance + " ago" : false
}

export function pretty(value) {
  return decode(
    prettyNum(value, {
      precision: 2,
      rounding: "significant",
      thousandsSeparator: "&thinsp;"
    })
  )
}

export function prettyUsd(value) {
  return decode(
    prettyNum(value, { precision: 2, thousandsSeparator: "&thinsp;" })
  )
}

export function prettyRound(value) {
  return decode(
    prettyNum(value, { precision: 0, thousandsSeparator: "&thinsp;" })
  )
}

export function prettyExact(value) {
  return decode(prettyNum(value, { thousandsSeparator: "&thinsp;" }))
}
