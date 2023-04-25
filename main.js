#! /usr/bin/env node
const readline = require('readline/promises').createInterface({
  input: process.stdin,
  output: process.stdout
})
const args = require('args')
function shuffle(arr) {
  var res = [], random
  while (arr.length > 0) {
    random = Math.floor(Math.random() * arr.length)
    res.push(arr[random])
    arr.splice(random, 1)
  }
  return res
}
var BASE = [
  ["电力感应塔", ["铁块", "磁线圈"]],
  ["风力涡轮机", ["铁块", "齿轮", "磁线圈"]],
  ["采矿机", ["铁块", "电路板", "磁线圈", "齿轮"]],
  ["矩阵研究站", ["铁块", "玻璃", "电路板", "磁线圈"]],
  ["火力发电厂", ["铁块", "石材", "齿轮", "磁线圈"]],
  ["小型储物仓", ["铁块", "石材"]],
  ["储液罐", ["铁块", "石材", "玻璃"]],
  ["四向分流器", ["铁块", "齿轮", "电路板"]],
  ["流速监测器", ["铁块", "齿轮", "玻璃", "电路板"]],
  ["分拣器", ["铁块", "齿轮"]],
  ["传送带", ["铁块", "齿轮"]],
  ["电弧熔炉", ["铁块", "石材", "电路板", "磁线圈"]],
  ["制作台", ["铁块", "齿轮", "电路板"]],
  ["抽水站", ["铁块", "石材", "电动机", "电路板"]],
  ["化工厂", ["钢材", "石材", "玻璃", "电路板"]],
  ["分馏塔", ["钢材", "石材", "玻璃", "处理器"]],
  ["原油精炼厂", ["钢材", "石材", "电路板", "电浆激发器"]],
  ["大型储物仓", ["钢材", "石材"]],
  ["地基", ["钢材", "石材"]],
  ["喷涂机", ["钢材", "电浆激发器"]],
  ["原油萃取站", ["钢材", "石材", "电路板", "电浆激发器"]],
  ["电磁轨道弹射器", ["钢材", "齿轮", "处理器", "超级磁场环"]],
  ["自动集装机", ["钢材", "齿轮", "超级磁场环"]],
  ["物流配送器", ["铁块", "电浆激发器", "处理器"]],
  ["太阳能板", ["高纯硅块", "铜块", "电路板"]],
  ["射线接收站", ["钢材", "高纯硅块", "光子合并器", "处理器", "超级磁场环"]],
  ["地热发电站", ["钢材", "铜块", "光子合并器", "超级磁场环"]],
  ["推进器", ["钢材", "铜块"]],
  ["蓄电池", ["铁块", "超级磁场环", "晶格硅"]],
  ["配送运输机", ["铁块", "电磁涡轮", "处理器"]],
  ["加力推进器", ["钛合金", "电磁涡轮"]],
  ["行星内物流运输站", ["钢材", "钛块", "处理器", "粒子容器"]],
  ["能量枢纽", ["钛合金", "钢材", "处理器", "粒子容器"]],
  ["微型聚变发电站", ["钛合金", "超级磁场环", "碳纳米管", "处理器"]],
  ["微型粒子对撞机", ["钛合金", "框架材料", "超级磁场环", "石墨烯", "处理器"]],
  ["大型采矿机", ["钛合金", "框架材料", "超级磁场环", "量子芯片", "光栅石"]],
  ["人造恒星", ["钛合金", "框架材料", "湮灭约束球", "量子芯片"]],
  ["垂直发射井", ["钛合金", "框架材料", "引力透镜", "量子芯片"]],
]
//可升级建筑只能加速不能增产","一般不与基本建筑共用产线
const UPGRADE = [
  ["星际物流运输站", ["行星内物流运输站", "钛合金", "粒子容器"]],
  ["轨道采集器", ["星际物流运输站", "超级磁场环", "加力推进器", "蓄电池满"]],
  ["星际物流运输机", ["钛合金", "处理器", "加力推进器"]],
  ["物流运输机", ["铁块", "处理器", "推进器"]],
  ["制作台Mk.Ⅱ", ["制作台Mk.Ⅰ", "石墨烯", "处理器"]],
  ["制作台Mk.Ⅲ", ["制作台Mk.Ⅱ", "粒子宽带", "量子芯片"]],
  ["量子化工厂", ["化工厂", "钛化玻璃", "奇异物质", "量子芯片"]],
  ["极速传送带", ["高速传送带", "超级磁场环", "石墨烯"]],
  ["高速传送带", ["传送带", "电磁涡轮"]],
  ["高速分拣器", ["分拣器", "电动机"]],
  ["极速分拣器", ["高速分拣器", "电磁涡轮"]],
  ["位面熔炉", ["电弧熔炉", "框架材料", "位面过滤器", "单极磁石"]],
  ["无线输电塔", ["电力感应塔", "电浆激发器"]],
  ["卫星配电站", ["无线输电塔", "超级磁场环", "框架材料"]],
]
const BATTLE = [

]
args.option('autonext', "auto search all possible permutatioin", 'false')
  .option('for', "search for base or upgrade or battle", 'base')
  .option('belt', 'max belts should use', 6)
  .option('duplicate', 'how many belts can break and reuse', 2)
  .option('component', 'components can duplicate, leave empty for all can duplicate', ["铁块"])
  .option('multiway', 'search for all possible ways of a permutation', 'false')
  .option('random', 'shufffle initial permutation', 'true')
  .option('prepermute', 'per permute', 'true')

const config = args.parse(process.argv)
const MAXBELT = config.belt
const MAXDUPBELT = config.duplicate
const ALLOWED_DUPL = config.component//[]//["铁块"]//,"齿轮","电浆激发器"]
const autonext = config.autonext == 'true' ? true : false
const multi_way = config.multiway == 'true' ? true : false      //是否输出同建筑序列的不同组件顺序
const doshuffle = config.random == 'true' ? true : false
const prepermute = config.prepermute == 'true' ? true : false
const from = { 'base': BASE, 'upgrade': UPGRADE, 'battle': BATTLE }
let fml = doshuffle ? shuffle(from[config.for]) : from[config.for]
if (prepermute) {
  let iron_steel_titanium = ["铁块","钢材","钛合金"]
  fml.sort((a, b) => {
    let ca = a[1][0], cb = b[1][0];
    if(ca == "高纯硅块" || cb =="高纯硅块")return 0
    let ia = iron_steel_titanium.indexOf(ca), ib = iron_steel_titanium.indexOf(cb)
    return ia==ib?0:(ia-ib)/Math.abs(ia-ib)
  })
}
console.log('FORMULA', fml)
const FORMULA = new Map(fml)
const BUILDING = [...FORMULA.keys()]
const seq = [...FORMULA.keys()]
const N = seq.length

//长度k的子集
function subset(arr, k) {
  const t = [];
  const ans = [];
  const n = arr.length;
  const dfs = (cur) => {
    if (t.length === k) {
      ans.push(t.slice());
      return;
    }
    if (cur == arr.length) return
    t.push(arr[cur]);
    dfs(cur + 1);
    t.pop();
    dfs(cur + 1);
  }
  dfs(0);
  return ans;
};

function remain(index) {
  let res = new Map()
  for (let i = index; i < N; i++) {
    let component = FORMULA.get(seq[i])
    for (let z of component) {
      res.set(z, (0 | res.get(z)) + 1)
    }
  }
  return res;
}

function sortfn(a, b) {
  let ia, ib;
  BUILDING.forEach((v, idx) => {
    if (v == a) ia = idx
    if (v == b) ib = idx
  })
  if (ia > ib) return 1;
  else if (ia == ib) return 0;
  else return -1;
}
function reverse(arr, start, end) {
  while (start < end) {
    [arr[start], arr[end]] = [arr[end], arr[start]]
    start++;
    end--;
  }
  //return arr.slice(0,start+1).concat(arr.slice(start,end).reverse())
}
function next_permutation(arr, sortfn) {
  let k = arr.length - 1
  while (k - 1 >= 0 && sortfn(arr[k - 1], arr[k]) == 1) k--;
  let t = k;
  while (t + 1 < arr.length && sortfn(arr[t + 1], arr[k - 1]) == 1) t++;
  [arr[k - 1], arr[t]] = [arr[t], arr[k - 1]];
  reverse(arr, k, arr.length - 1)
  return k - 1
}
function next_permutation_n(arr, sortfn, n) {
  n = Math.min(n, arr.length - 2)
  let right = arr.slice(n + 1)
  right.sort((a, b) => -sortfn(a, b))
  arr.splice(n + 1, arr.length - n - 1)
  arr.push(...right)
  let k = (n + 1 < arr.length && sortfn(arr[n], arr[n + 1]) >= 1) ? n : n + 1
  let t = k;
  while (t + 1 < arr.length && sortfn(arr[t + 1], arr[k - 1]) >= 1) t++;
  [arr[k - 1], arr[t]] = [arr[t], arr[k - 1]];
  reverse(arr, k, arr.length - 1)
  return k - 1
  // return next_permutation(arr, sortfn)
}
function checkDups(routers) {
  let duparr = []
  let dupm = new Map()
  for (let i = 0; i < routers.length; i++) {
    // console.log(routers[i])
    for (let c of routers[i]) {
      if (dupm.has(c) && i > 0 && routers[i - 1].indexOf(c) == -1)
        duparr.push(c)
      dupm.set(c, 1)
    }
  }
  return duparr
}
async function main() {

  var ans = {}
  var exit = false
  var routers = []
  var finded = false
  var question = "find! search next?"
  var saveend = Infinity
  var saved_routers = []
  function backtrack(current, arr, dups) {
    if (exit == true) return
    if (!multi_way && finded == true) {
      return
    }
    if (current < saveend) {
      //bug backtrack??? nobug
      saved_routers.push(arr)
    }
    if (current === N) {
      finded = true
      ans[[...seq]] = 1
      console.log(seq)
      console.log("+++++++++++++++++")
      for (let i = 0; i < routers.length; i++) {
        console.log(routers[i])
      }
      let duparr = checkDups(routers)
      console.log("duplicate: ", duparr)
      console.log("------------------------------------")
      return
    }
    let component = FORMULA.get(seq[current])
    let rem = remain(current + 1)
    let need = arr.reduce((pre, cur) => {
      //去重+以后要用
      if (component.indexOf(cur) == -1 && rem.get(cur)) {
        return pre.concat(cur)
      }
      else return pre
    }, [])
    if (need.length + component.length > MAXBELT) {
      let candup = [], nodup = []
      for (let z of need) {
        if (ALLOWED_DUPL.length == 0 || ALLOWED_DUPL.indexOf(z) != -1)
          candup.push(z)
        else nodup.push(z)
      }
      let newdup = need.length + component.length - MAXBELT
      if (candup.length < newdup || dups + newdup > MAXDUPBELT) {
        saveend = Math.min(saveend, current)
        return
      }
      nodup = nodup.concat(component)
      let sub = subset(candup, MAXBELT - nodup.length)
      if (sub.length > 1) {
        saveend = Math.min(saveend, current)
      }
      //todo log in tree
      for (let s of sub) {
        let r = s.concat(nodup)
        routers.push(r)
        backtrack(current + 1, r, dups + newdup);
        routers.pop()
      }

    }
    else {
      let r = need.concat(component)
      routers.push(r)
      backtrack(current + 1, r, dups);
      routers.pop()
    }
  }

  let current = 0, arr = [], dups = 0
  while (!exit) {
    backtrack(current, arr, dups)
    let resume = "y"
    if (!autonext && finded) {
      while (true) {
        resume = await readline.question(question)
        if (resume == "n") {
          exit = true
          break;
        }
        else if (resume == 'y') {
          break;
        }
      }
    }

    if (resume === "y") {
      let save = saved_routers.length
      // while((current = next()) > saved_routers.length);
      // current = next()

      if (finded) {
        let n = next_permutation(seq, sortfn)
        if (n == -1) break//end permutation
        current = Math.min(saveend - 1, n)
        // if (saveend -1 < n) {
        //   //
        //   current = saveend - 1
        // }
        // else {
        //   current = n
        // }
        arr = saved_routers[current]
        routers = saved_routers.slice(1, current + 1)
        dups = checkDups(routers).length
        saved_routers.splice(current)
        saveend = Infinity
      }
      else {
        let n = next_permutation_n(seq, sortfn, saveend)
        if (n == -1) break
        //n < saveend
        current = n
        arr = saved_routers[current]
        routers = saved_routers.slice(1, current + 1)
        dups = checkDups(routers).length
        saved_routers.splice(current)
        saveend = Infinity
        // let k = saveend
        // let left = seq.slice(0,saveend),right = seq.slice(saveend)
        // right.sort((a,b)=>-sortfn(a,b))
        // current = saveend 
        // seq = left.concat(right)
        // next()
        // let k = arr.length - 1
        // while (k - 1 >= 0 && sortfn(arr[k - 1], arr[k]) == 1) k--;
        // let t = k;
        // while (t + 1 < arr.length && sortfn(arr[t + 1], arr[k - 1]) == 1) t++;
        // [arr[k - 1], arr[t]] = [arr[t], arr[k - 1]];
        // reverse(arr, k, arr.length - 1)
      }
      // reuseindex = current - 1
      // arr = saved_routers[current]
      // routers = saved_routers.slice(1, current+1)
      // dups = checkDups(routers).lengthx
      // saved_routers = routers

    }
    finded = false
  }
  readline.close();
  return 0
}

main()

