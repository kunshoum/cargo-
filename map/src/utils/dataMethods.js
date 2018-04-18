export const chunk = (arr, size) => Array.from( {length: Math.ceil(arr.length/size)} )
                                         .map((v, i) => arr.slice(i * size, i * size + size))

export const flatten = arr => arr.reduce((v1, v2) => v1.concat(v2), [])