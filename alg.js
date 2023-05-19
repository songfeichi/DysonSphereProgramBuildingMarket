
function swap(arr, a, b) { [arr[a], arr[b]] = [arr[b], arr[a]] }
function sortfn(a, b) { return (a - b) / Math.abs(a - b) }
//左闭右开
function reverse(arr, start, end) {
  end--;
  while (start < end) {
    swap(arr, start, end)
    start++;
    end--;
  }
  //return arr.slice(0,start+1).concat(arr.slice(start,end).reverse())
}
function next_permutation_brutal(arr) {
  let k = arr.length - 1
  while (k - 1 >= 0 && arr[k - 1] > arr[k]) k--;
  let t = k;
  while (t + 1 < arr.length && sortfn(arr[t + 1], arr[k - 1]) == 1) t++;
  let j = k;
  [arr[k - 1], arr[t]] = [arr[t], arr[k - 1]];
  reverse(arr, k, arr.length)
  while (arr[arr.length - 1] <= arr[0]) {
    return next_permutation_brutal(arr)
  }
  return k - 1
}

function next_permutation_mirror(arr) {
  //中间全排列，尾部递减，确保尾>头
  let n = arr.length, k = n - 3
  while (k >= 1 && arr[k] > arr[k + 1]) k--;
  // let j = k-1;
  // while(arr[j]<arr[0])j--
  if (k == 0) {
    let i = 1
    while (i < n - 1) {
      if (arr[i] > arr[0] && arr[i] < arr[n - 1]) {
        [arr[i], arr[n - 1]] = [arr[n - 1], arr[i]]
        break
      }
      i++
    }
    //not found
    if (i == n - 1) {
      //end e.g. 3214
      if (arr[0] > arr[1])
        return -1;
      let v = arr[0]
      arr[0] = arr[n - 1]
      arr.splice(n - 1)
      //insert sort
      let j = 1
      for (; j < n - 1; j++) {
        if (v < arr[j] && v > arr[j + 1]) {
          arr.splice(j + 1, 0, v);
          break;
        }
      }
      if (j == n - 1)
        arr.splice(j, 0, v)
      reverse(arr, 1, n)
    }
    else {
      reverse(arr, 1, n - 1)
    }
    return 1
  }
  let t = k + 1;
  while (t + 1 < n - 1 && sortfn(arr[t + 1], arr[k]) == 1) t++;
  [arr[k], arr[t]] = [arr[t], arr[k]];
  reverse(arr, k + 1, arr.length - 1)
  return k
}
function next_permutation_vanilla(arr) {
  let k = arr.length - 1
  while (k - 1 >= 0 && arr[k - 1] > arr[k]) k--;
  let t = k;
  while (t + 1 < arr.length && sortfn(arr[t + 1], arr[k - 1]) == 1 && arr[k] > arr[0]) t++;
  [arr[k - 1], arr[t]] = [arr[t], arr[k - 1]];
  reverse(arr, k, arr.length)
  return k - 1
}
function prev_permute(arr, start, end) {
  //[start,end)
  let i = end - 2, j = end - 1
  for (; i >= start && arr[i] <= arr[i + 1]; i--);
  if (i < start) return -1
  for (; arr[j] > arr[i]; j--);
  swap(arr, i, j)
  reverse(arr, i + 1, end)
  return i
}
function permute(arr, start, end) {
  //[start,end)
  let i = end - 2, j = end - 1
  for (; i >= start && arr[i] >= arr[i + 1]; i--);
  if (i < start) return -1
  for (; arr[j] < arr[i]; j--);
  swap(arr, i, j)
  reverse(arr, i + 1, end)
  return i
}
function temp(arr) {
  let n = arr.length
  let x = n - 2
  while (x > 0 && arr[x] < arr[0]) {
    x--
  }
  // if(x==-1)return x;
  //permute between j and n-1
  //32514
  let y = permute(arr, x, n - 1)
  if (y == -1) {
    if (x == 0) return -1
    if (arr[n - 1] > arr[x]) {
      swap(arr, x, n - 1)
      reverse(arr, x + 1, n - 1)
      return x
    }
    else {
      // swap(arr,x,n-1)
      for (let z = n - 1; z > x + 1; z--) {
        swap(arr, z, z - 1)
      }
      let i = n - 1, j = i - 1;
      while (i > 0 && arr[j] >= arr[i]) { i--; j--; }
      if (i <= 0) return -1
      for (i = n - 1; arr[i] <= arr[j]; i--);
      swap(arr, i, j)
      reverse(arr, j + 1, n)
      return j
    }
  }
  return y
}
var TIME=0
function next_permutation_mirror_dictorder(arr) {
  let n = arr.length
  if (arr[n - 2] < arr[n - 1] && arr[n - 2] < arr[0]) {
    let x = n - 3
    while (x > 0 && arr[x] < arr[0]) {
      x--;
      TIME++;
    }

    let y = permute(arr, x, n - 1)
    // TIME+=(n-1-x)
    if (y == -1) {
      if (x == 0) return -1
      if (arr[n - 1] > arr[x]) {
        swap(arr, x, n - 1)
        reverse(arr, x + 1, n - 1)
        TIME+=(n-x)
        return x
      }
      else {
        for (let z = n - 1; z > x + 1; z--) {
          swap(arr, z, z - 1)
          TIME++
        }
        let i = x - 1, j = n - 1
        for (; i >= 0 && arr[i] >= arr[i + 1]; i--);
        TIME+=(x-1-i);
        if (i < 0) return -1
        for (; arr[j] < arr[i]; j--){
        TIME++;}
        swap(arr, i, j)
        reverse(arr, i + 1, n)
        TIME+=(n-i)
        return i
      }
    }
    return y
  }
  else {
    permute(arr, 0, n)
  }
}
// function next_permutation(arr) {
//   let n = arr.length
//   let k = arr.length - 1
//   while (k - 1 >= 0 && arr[k - 1] > arr[k]) k--;
//   if (k == 0) return -1
//   // while(arr[k-1]<arr[0])k--
//   let t = k;
//   while (t + 1 < arr.length && sortfn(arr[t + 1], arr[k - 1]) == 1) t++;
//   // console.log(k,t);
//   //t>=k
//   let j = k;
//   if (t == k) j = k - 1;
//   console.log(arr[j]);
//   if (arr[j] < arr[0]) {
//     return temp(arr)
//   }
//   [arr[k - 1], arr[t]] = [arr[t], arr[k - 1]];
//   reverse(arr, k, arr.length)
//   return k - 1
// }
function next_permutation_n(arr, sortfn, n) {
  n = Math.min(n, arr.length - 2)
  let right = arr.slice(n + 1)
  right.sort((a, b) => -sortfn(a, b))
  arr.splice(n + 1, arr.length - n - 1)
  arr.push(...right)
  let k = n + 1;
  while (k >= 1 && sortfn(arr[k - 1], arr[k]) >= 1) k--
  let t = k;
  while (t + 1 < arr.length && sortfn(arr[t + 1], arr[k - 1]) >= 1) t++;
  [arr[k - 1], arr[t]] = [arr[t], arr[k - 1]];
  reverse(arr, k, arr.length)
  return k - 1

  // return next_permutation(arr, sortfn)
}

let arr = [1,2,3,4,5,6,7,8,9,10,11]

let count = 1
// next_permutation(arr)
while (next_permutation_mirror_dictorder(arr) != -1) {
  // console.log(arr)
  count++
}
console.log(count)
console.log('time',TIME)
