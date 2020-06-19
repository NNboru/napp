const initobj = [
  {
    name:'bubble 1',
    shape:'circle',
    color:'skyblue',
    source:0,
    show:true,
    movex:true,
    movey:true,
    ease:true,
    scalex:true,
    scaley:true,
    fade:false,
    rotate:true,
    speed:160,
    scalexMin:.8,
    scaleyMin:.8,
    scalexMax:1.2,
    scaleyMax:1.2,
    ex:100,
    count:3,
  },
  {
    name:'bubble 2',
    shape:'circle',
    color:'skyblue',
    source:1,
    show:true,
    movex:true,
    movey:true,
    ease:true,
    scalex:true,
    scaley:true,
    fade:false,
    rotate:true,
    speed:200,
    scalexMin:1.8,
    scaleyMin:1.8,
    scalexMax:2,
    scaleyMax:2,
    ex:0,
    count:6,
  },
  {
    name:'bubble 3',
    shape:'circle',
    color:'skyblue',
    source:2,
    show:true,
    movex:true,
    movey:true,
    ease:true,
    scalex:true,
    scaley:true,
    fade:false,
    rotate:true,
    speed:200,
    scalexMin:.4,
    scaleyMin:.4,
    scalexMax:.8,
    scaleyMax:.8,
    ex:100,
    count:2,
  },
  {
    name:'sun',
    shape:'circle',
    color:'skyblue',
    source:4,
    show:false,
    movex:true,
    movey:true,
    scalex:true,
    scaley:true,
    ease:true,
    fade:false,
    rotate:true,
    speed:200,
    scalexMin:.8,
    scaleyMin:.8,
    scalexMax:1.2,
    scaleyMax:1.2,
    ex:100,
    count:1,
  },
  {
    name:'spider',
    shape:'circle',
    color:'skyblue',
    source:5,
    show:false,
    movex:true,
    movey:true,
    ease:false,
    scalex:true,
    scaley:true,
    fade:false,
    rotate:true,
    speed:320,
    scalexMin:1.5,
    scaleyMin:1.5,
    scalexMax:2,
    scaleyMax:2,
    ex:120,
    count:8,
  },
  {
    name:'logo',
    shape:'circle',
    color:'skyblue',
    source:6,
    show:false,
    movex:true,
    movey:true,
    ease:true,
    scalex:true,
    scaley:true,
    fade:false,
    rotate:true,
    speed:250,
    scalexMin:1.5,
    scaleyMin:1.5,
    scalexMax:1.6,
    scaleyMax:1.6,
    ex:400,
    count:1,
  },
  {
    name:'captain',
    shape:'circle',
    color:'skyblue',
    source:7,
    show:true,
    movex:true,
    movey:true,
    ease:true,
    scalex:false,
    scaley:false,
    fade:false,
    rotate:true,
    speed:100,
    scalexMin:1.5,
    scaleyMin:1.5,
    scalexMax:1.8,
    scaleyMax:1.8,
    ex:900,
    count:1,
  },
  
  {
    show:false,
    source:3
  }

]
const newitem = {
  shape:'circle',
  color:'skyblue',
  source:0,
  show:true,
  movex:true,
  movey:true,
  ease:true,
  scalex:true,
  scaley:true,
  fade:false,
  rotate:true,
  speed:200,
  scalexMin:.8,
  scaleyMin:.8,
  scalexMax:1.2,
  scaleyMax:1.2,
  ex:100,
  count:1,
}

const bub = [
  require('./my/bubble1.png'),
  require('./my/bubble2.jpg'),
  require('./my/bubble3.jpg'),
  require('./my/bubble4.jpg'),
  require('./my/extra1.png'),
  require('./my/extra2.png'),
  require('./my/extra3.png'),
  require('./my/extra4.png')
]

import React, { Component, useState, useEffect ,useRef} from 'react'
import {StyleSheet, View, Text, Dimensions, Animated, Switch, Easing, TouchableOpacity as Touchop, TouchableHighlight, TouchableWithoutFeedback,
       Button, Alert, ScrollView, ToastAndroid, Image, Vibration, StatusBar, ImageBackground, Modal, LayoutAnimation, UIManager, BackHandler} from 'react-native';
import {Picker} from '@react-native-community/picker';
import {TouchableOpacity, TextInput, TouchableNativeFeedback} from 'react-native-gesture-handler'
import { CheckBox,Slider } from 'react-native-elements'
import Icon from 'react-native-vector-icons/Feather';
import ImagePicker from 'react-native-image-crop-picker';
import RNFS from 'react-native-fs'
import KeepAwake from 'react-native-keep-awake'
import SplashScreen from "react-native-splash-screen"

UIManager.setLayoutAnimationEnabledExperimental(true);
const path = RNFS.DocumentDirectoryPath + '/data.txt';
async function log(obj){
  RNFS.writeFile(path, JSON.stringify(obj), 'utf8')
  .catch((err) => {
    console.log(err.message);
  });
}
async function readlog(){
  if(! await RNFS.exists(path))
    return initobj
  return JSON.parse(await RNFS.readFile(path, 'utf8').catch(e=>console.log(e.message)))
}


let {width:W,height:H} = Dimensions.get('window'), itemname=null;
Dimensions.addEventListener('change',newWH)
function newWH({window:w}){
  W=w.width;
  H=w.height;
}
function rand(min=0,max=10){
  return min + Math.random()*(max-min)
}
function SeparatorV({width}) {
  return <View style={[s.separatorV,width?{borderLeftWidth:width,borderRadius:width}:{}]} />;
}
function SeparatorH({width}) {
  return <View style={[s.separatorH,width?{borderTopWidth:width,borderRadius:width}:{}]} />;
}
function Space({height}) {
  return <View style={{height:(height?height:10)}} />;
}
function tip(msg){
  ToastAndroid.show(msg, ToastAndroid.SHORT);
}


function Hiddentxt({name}){
  return (
    <Text style={{textAlign:'center',fontSize:20,color:'orangered',lineHeight:100}}>
      {name} hidden!
    </Text>
  )
}

function Mybut(props){
  return (
    <Touchop onPress={props.onPress}>
      <View style={[{padding:4,borderRadius:4},props.style]}>
        {props.children}
      </View>
    </Touchop>
  )
}

function Itemset(props){
  let items = []
  for(let i=0; i<props.count; ++i){
    items.push(<Item key={i} ki={'item'+i} {...props} />)
  }
  
  return <View key={props.kee} style={s.main}>{items}</View>
}


class Item extends Component{
  constructor(props){
    super(props)
    this.state = {
      x:new Animated.Value(rand(0, W-100)),
      y:new Animated.Value(rand(0, H-100)),
      w:new Animated.Value(1),
      h:new Animated.Value(1),
      r:new Animated.Value(50),
      op:new Animated.Value(0)
    }
    this.restart = this.restart.bind(this)
    this.restart()
  }
  
  restart(){
    let x,y,x2,y2, wmn,wmx,hmn,hmx, rot ,dis,sp,time, easing ;
    x=Number.parseFloat(JSON.stringify(this.state.x))
    y=Number.parseFloat(JSON.stringify(this.state.y))
    x2 = rand(-this.props.ex, W+this.props.ex-100)
    y2 = rand(-this.props.ex, H+this.props.ex-100)
    wmn= this.props.scalexMin
    wmx= this.props.scalexMax
    hmn= this.props.scaleyMin
    hmx= this.props.scaleyMax
    rot= rand(0,360)
    W1 = rand(wmn,wmx),W2 = rand(wmn,wmx),W3 = rand(wmn,wmx),W4 = rand(wmn,wmx)
    H1 = rand(hmn,hmx),H2 = rand(hmn,hmx),H3 = rand(hmn,hmx),H4 = rand(hmn,hmx)
    dis = Math.sqrt((x2-x)*(x2-x) + (y2-y)*(y2-y))
    sp = (400-this.props.speed)*10 + dis
    time = rand(sp, sp+500)
    let lin = Easing.linear
    easing = this.props.ease?Easing.bezier(.44,-0.06,.54,1.05):lin
    //easing = Easing.linear
    
    this.ani = Animated.parallel([
      !this.props.rotate?Animated.timing(this.state.r, {
        useNativeDriver:true,
        toValue:0,
        duration:1,
        easing
      }): Animated.timing(this.state.r, {
        useNativeDriver:true,
        toValue:rot,
        duration:time,
        easing
      }),
      !this.props.movex?null: Animated.timing(this.state.x, {
        useNativeDriver:true,
        toValue:x2,
        duration:time,
        easing
      }),
      !this.props.movey?null: Animated.timing(this.state.y, {
        useNativeDriver:true,
        toValue:y2,
        duration:time,
        easing
      }),
      !this.props.scalex?Animated.timing(this.state.w, {
        useNativeDriver:true,
        toValue:1,
        duration:1,
        easing
      }): 
      Animated.sequence([
        Animated.timing(this.state.w, {
          useNativeDriver:true,
          toValue:W1,
          duration:(time/4),
          easing:lin
        }),
        Animated.timing(this.state.w, {
          useNativeDriver:true,
          toValue:W2,
          duration:(time/4),
          easing:lin
        }),
        Animated.timing(this.state.w, {
          useNativeDriver:true,
          toValue:W3,
          duration:(time/4),
          easing:lin
        }),
        Animated.timing(this.state.w, {
          useNativeDriver:true,
          toValue:W4,
          duration:(time/4),
          easing:lin
        }),
      ]),
      !this.props.scaley?Animated.timing(this.state.h, {
        useNativeDriver:true,
        toValue:1,
        duration:1,
        easing
      }): 
      Animated.sequence([
        Animated.timing(this.state.h, {
          useNativeDriver:true,
          toValue:H1,
          duration:(time/4),
          easing:lin
        }),
        Animated.timing(this.state.h, {
          useNativeDriver:true,
          toValue:H2,
          duration:(time/4),
          easing:lin
        }),
        Animated.timing(this.state.h, {
          useNativeDriver:true,
          toValue:H3,
          duration:(time/4),
          easing:lin
        }),
        Animated.timing(this.state.h, {
          useNativeDriver:true,
          toValue:H4,
          duration:(time/4),
          easing:lin
        }),
      ]),
      !this.props.fade? Animated.timing(this.state.op, {
        useNativeDriver:true,
        toValue:.8,
        duration:1,
        easing
      }):
      Animated.sequence([
        Animated.timing(this.state.op, {
          useNativeDriver:true,
          toValue:.8,
          duration:(time/2),
          easing
        }),
        Animated.timing(this.state.op, {
          useNativeDriver:true,
          toValue:.2,
          duration:(time/2),
          easing
        }),
      ])
    ])
    this.ani.start(this.restart)
  }

  relocate(){
    this.ani.stop()
    Animated.parallel([
      Animated.timing(this.state.op, {
        useNativeDriver:true,
        toValue:0,
        duration:120,
      }),
      Animated.timing(this.state.w, {
        useNativeDriver:true,
        toValue:3,
        duration:120,
      }),
      Animated.timing(this.state.h, {
        useNativeDriver:true,
        toValue:2,
        duration:120,
      }),
    ]).start()
      
    Vibration.vibrate(20)
  }

  render(){
      return (
        <Animated.View key={this.props.ki} style={[s.box, s[this.props.shape], {
          backgroundColor:(this.props.source===null?this.props.color:'#0000'),
          opacity:this.state.op,
          transform:[
              {translateX:this.state.x},
              {translateY:this.state.y},
              {scaleX:this.state.w},
              {scaleY:this.state.h},
              {rotate:this.state.r.interpolate({
                inputRange:[0,360],
                outputRange:['0deg','360deg']
              })},
            ],
          } ]} >
          <TouchableOpacity onPressIn={()=>this.relocate()}>
            {this.props.source!==null && 
              <Image source={Number.isInteger(this.props.source)?bub[this.props.source]:{uri:this.props.source}} style={s.img} />
            }
          </TouchableOpacity>
        </Animated.View>
      )
  }
}

class Menu extends Component{
  constructor(props){
    super(props)
    this.state={
      menu:false,
      adding:false,
      now:0,
      count:this.props.bag[0].count,
      speed:this.props.bag[0].speed,
      xmin:this.props.bag[0].scalexMin, 
      xmax:this.props.bag[0].scalexMax,
      ymin:this.props.bag[0].scaleyMin,
      ymax:this.props.bag[0].scaleyMax,
    }
    this.setnow = this.setnow.bind(this)
    this.setcount = this.setcount.bind(this)
    this.setspeed = this.setspeed.bind(this)
    this.showhide = this.showhide.bind(this)
    this.deleteme = this.deleteme.bind(this)
    this.setfade = this.setfade.bind(this)
    this.setspin = this.setspin.bind(this)
    this.setmovex = this.setmovex.bind(this)
    this.setmovey = this.setmovey.bind(this)
    this.setease = this.setease.bind(this)
    this.setscalex = this.setscalex.bind(this)
    this.setscaley = this.setscaley.bind(this)
    this.setshape = this.setshape.bind(this)
    this.setscalexmin = this.setscalexmin.bind(this)
    this.setscalexmax = this.setscalexmax.bind(this)
    this.setscaleymin = this.setscaleymin.bind(this)
    this.setscaleymax = this.setscaleymax.bind(this)
    this.setex = this.setex.bind(this)
    
    this.upload = this.upload.bind(this)
    this.removeimg = this.removeimg.bind(this)
    this.changebg = this.changebg.bind(this)
    this.reset = this.reset.bind(this)
    this.additem = this.additem.bind(this)
  }
  setnow(ind){
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({now:ind,
      count:this.props.bag[ind].count, 
      speed:this.props.bag[ind].speed, 
      xmin:this.props.bag[ind].scalexMin, 
      xmax:this.props.bag[ind].scalexMax,
      ymin:this.props.bag[ind].scaleyMin,
      ymax:this.props.bag[ind].scaleyMax,
    })
  }
  setcount(v,ind){
    let obj = this.props.bag.slice()
    obj[ind].count=v
    this.props.setobj(obj)
  }
  setspeed(v,ind){
    let obj = this.props.bag.slice()
    obj[ind].speed=v
    this.props.setobj(obj)
  }
  deleteme(ind){
    let obj = this.props.bag.slice()
    ToastAndroid.show(obj[ind].name+' deleted!', ToastAndroid.SHORT);
    obj.splice(ind,1)
    this.setnow(0)
    this.props.setobj(obj)
  }
  showhide(v,ind){
    let obj = this.props.bag.slice()
    obj[ind].show=v
    ToastAndroid.show(obj[ind].name+(v?' visible':' hidden')+' now!', ToastAndroid.SHORT);
    this.props.setobj(obj)
  }
  setfade(v,ind){
    let obj = this.props.bag.slice()
    obj[ind].fade=v
    this.props.setobj(obj)
  }
  setspin(v,ind){
    let obj = this.props.bag.slice()
    obj[ind].rotate=v
    this.props.setobj(obj)
  }
  setmovex(v,ind){
    let obj = this.props.bag.slice()
    obj[ind].movex=v
    this.props.setobj(obj)
  }
  setmovey(v,ind){
    let obj = this.props.bag.slice()
    obj[ind].movey=v
    this.props.setobj(obj)
  }
  setease(v,ind){
    let obj = this.props.bag.slice()
    obj[ind].ease=v
    this.la()
    this.props.setobj(obj)
  }
  
  setscalex(v,ind){
    let obj = this.props.bag.slice()
    obj[ind].scalex=v
    this.props.setobj(obj)
  }
  setscaley(v,ind){
    let obj = this.props.bag.slice()
    obj[ind].scaley=v
    this.props.setobj(obj)
  }
  setshape(shape,ind){
    let obj = this.props.bag.slice()
    obj[ind].shape=shape
    this.props.setobj(obj)
  }
  setscalexmin(v,ind){
    let obj = this.props.bag.slice()
    obj[ind].scalexMin=v
    if(obj[ind].scalexMax<v){
      obj[ind].scalexMax=v
      this.setState({xmax:v})
    }
    this.props.setobj(obj)
  }
  setscalexmax(v,ind){
    let obj = this.props.bag.slice()
    obj[ind].scalexMax=v
    if(obj[ind].scalexMin>v){
      obj[ind].scalexMin=v
      this.setState({xmin:v})
    }
    this.props.setobj(obj)
  }
  setscaleymin(v,ind){
    let obj = this.props.bag.slice()
    obj[ind].scaleyMin=v
    if(obj[ind].scaleyMax<v){
      obj[ind].scaleyMax=v
      this.setState({ymax:v})
    }
    this.props.setobj(obj)
  }
  setscaleymax(v,ind){
    let obj = this.props.bag.slice()
    obj[ind].scaleyMax=v
    if(obj[ind].scaleyMin>v){
      obj[ind].scaleyMin=v
      this.setState({ymin:v})
    }
    this.props.setobj(obj)
  }
  setex(v,ind){
    let v1=v
    v = Number.parseInt(v)
    if(!Number.isInteger(v)) {Alert.alert('"'+v1+'" is not a number','Enter distance your item is allowed to go out of screen');return;}
    let obj = this.props.bag.slice()
    obj[ind].ex=v
    this.props.setobj(obj)
  }
  
  upload(){
    ImagePicker.openPicker({
      cropping: true
    }).then(image => {
      let obj = this.props.bag.slice()
      obj[this.state.now].source=image.path
      this.props.setobj(obj)
    }).catch(()=>{});
  }
  removeimg(){
    let obj = this.props.bag.slice()
    obj[this.state.now].source=null
    this.props.setobj(obj)
  }

  changebg(){
    ImagePicker.openPicker({
      width: W,
      height: H,
      cropping: true,
    }).then(image => {
      let obj = this.props.bag.slice()
      obj[obj.length-1].source=image.path
      this.setState({menu:false})
      this.props.setobj(obj)
      this.props.closemenu()
    }).catch((e)=>{console.log(e.message)});
  }
  reset(){
    Alert.alert('Confirm','This will remove all changes!',[
      {text:'cancel',style: "cancel"},
      {text:'reset',
        onPress:()=>{
          this.setState({menu:false})
          this.props.closemenu()
          this.props.setobj(initobj)
          this.setnow(0)
          ImagePicker.clean()
        }
      }
    ],{cancelable:true})
  }

  additem(){
    if(!itemname){
      Alert.alert('BLANK','Name is required.\nPlease enter a name.')
    }
    else{
      let obj = this.props.bag.slice(), len=obj.length-1
      obj.splice(len,0,{name:itemname,...newitem})
      this.setState({adding:false,now:len})
      this.props.setobj(obj)
      itemname=null
    }
  }
  la(){
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
  }

  render(){
    //if(!this.props.show) return null
    let now = this.state.now
    let items = this.props.bag.map((item,ind)=>{
      if(!item.name) return null
      return (
        <View key={ind} style={[now===ind?{backgroundColor:'cyan'}:{},{padding:4,margin:4}]}>
          <TouchableOpacity onPress={()=>this.setnow(ind)}>
            <View style={{backgroundColor:(now===ind?'royalblue':'dodgerblue'),borderRadius:10, padding:10}}>
              <Text style={[{textAlign:'center', fontSize:16, },
                  (now===ind?{textShadowOffset:{width:10,height:10},fontWeight:'bold',textDecorationLine:'underline', fontSize:18}:{})]}
              >
                {item.name}
              </Text>
            </View>
          </TouchableOpacity>
          {now===ind && 
            <View style={{flexDirection:'row',justifyContent:'space-between',height:30}}>
              <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={"#f5dd4b"}
                onValueChange={(v)=>this.showhide(v,ind)}
                value={this.props.bag[ind].show}
              />
              <TouchableOpacity onPress={()=>this.deleteme(ind)}>
                <View style={{backgroundColor:'dodgerblue',padding:4,borderRadius:8}}><Text>delete</Text></View>
              </TouchableOpacity>
            </View>
          }
        </View>
      )
    })
    items.push(
      <View key={-1} style={{padding:4,margin:4}}>
          <TouchableOpacity onPress={()=>{this.la();this.setState({adding:true})}}>
            <View style={{backgroundColor:'limegreen',borderRadius:10, padding:10}}>
              <Text style={{textAlign:'center', fontSize:16}}>
                Add Item
              </Text>
            </View>
          </TouchableOpacity>
      </View>
    )
    let itemProp = (
      <ScrollView style={[s.submenu,{width:'64%'},this.props.show?null:{padding:0}]}>
        <Text style={s.center}>Properties</Text>
          <SeparatorH />
          <Space height={16} />
        { this.props.bag.length!==1 && !this.props.bag[now].show && <Hiddentxt name={this.props.bag[now].name} />}
        { this.props.bag.length!==1 &&  this.props.bag[now].show && (
        <View style={{alignContent:'center'}}>
          
          <View style={s.row}>
            <Text style={s.prop}>Shape</Text>
            {!this.props.show?null:
            <Picker
              selectedValue={this.props.bag[now].shape}
              style={{height:'100%', width:'51%'}}
              mode='dropdown'
              prompt='Shape'
              onValueChange={v=>{this.setshape(v,now)}}
            >
              <Picker.Item label="Circle" value="circle" />
              <Picker.Item label="Square" value="square" />
            </Picker>}
          </View>
          <Space />
          <View style={s.row}>
            <Text style={s.prop}>Fade</Text>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={"#f5dd4b"}
              onValueChange={(v)=>this.setfade(v,now)}
              value={this.props.bag[now].fade}
            />
          </View>
          <Space />
          <View style={s.row}>
            <Text style={s.prop}>Spin</Text>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={"#f5dd4b"}
              onValueChange={(v)=>this.setspin(v,now)}
              value={this.props.bag[now].rotate}
            />
          </View>
          <Space />
          
          <View style={s.row}>
            <Text style={s.prop}>Move X</Text>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={"#f5dd4b"}
              onValueChange={(v)=>this.setmovex(v,now)}
              value={this.props.bag[now].movex}
            />
          </View>
          <Space />
          <View style={s.row}>
            <Text style={s.prop}>Move Y</Text>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={"#f5dd4b"}
              onValueChange={(v)=>this.setmovey(v,now)}
              value={this.props.bag[now].movey}
            />
          </View>
          <Space />
          {(!this.props.bag[now].movex && !this.props.bag[now].movey)?null:
          <View style={[s.row,{justifyContent:'space-evenly',paddingHorizontal:'20%'}]}>
            <Text style={{textAlignVertical:'center', fontSize:this.props.bag[now].ease?14:18}}>Linear</Text>
            <Switch
              trackColor={{ false: "#81b0ff", true: "#81b0ff" }}
              thumbColor={"#f5dd4b"}
              onValueChange={(v)=>this.setease(v,now)}
              value={this.props.bag[now].ease}
            />
            <Text style={{textAlignVertical:'center', fontSize:this.props.bag[now].ease?18:14}}>Ease</Text>
          </View>}
          <Space />

          <View style={s.row}>
            <Text style={s.prop}>Scale X</Text>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={"#f5dd4b"}
              onValueChange={(v)=>this.setscalex(v,now)}
              value={this.props.bag[now].scalex}
            />
          </View>
          {this.props.bag[now].scalex && 
            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
              <Slider value={this.props.bag[now].scalexMin}
                  onSlidingComplete={v=>this.setscalexmin(Number(v.toFixed(1)),now)} 
                  onValueChange={v=>this.setState({xmin:Number(v.toFixed(1))})}
                  minimumValue={.1}
                  maximumValue={8}
                  step={.1}
                  style={{width:'36%'}}
                  thumbTintColor='orange'
              />
              <Text>{this.state.xmin} - {this.state.xmax}</Text>
              <Slider value={this.props.bag[now].scalexMax}
                  onSlidingComplete={v=>this.setscalexmax(Number(v.toFixed(1)),now)} 
                  onValueChange={v=>this.setState({xmax:Number(v.toFixed(1))})}
                  minimumValue={.1}
                  maximumValue={8}
                  step={.01}
                  style={{width:'36%'}}
                  thumbTintColor='orange'
              />
            </View>
          }
          <Space />
          <View style={s.row}>
            <Text style={s.prop}>Scale Y</Text>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={"#f5dd4b"}
              onValueChange={(v)=>this.setscaley(v,now)}
              value={this.props.bag[now].scaley}
            />
          </View>
          {this.props.bag[now].scaley && 
            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
              <Slider value={this.props.bag[now].scaleyMin}
                  onSlidingComplete={v=>this.setscaleymin(Number(v.toFixed(1)),now)} 
                  onValueChange={v=>this.setState({ymin:Number(v.toFixed(1))})}
                  minimumValue={.1}
                  maximumValue={8}
                  step={.1}
                  style={{width:'36%'}}
                  thumbTintColor='orange'
              />
              <Text>{this.state.ymin} - {this.state.ymax}</Text>
              <Slider value={this.props.bag[now].scaleyMax}
                  onSlidingComplete={v=>this.setscaleymax(Number(v.toFixed(1)),now)} 
                  onValueChange={v=>this.setState({ymax:Number(v.toFixed(1))})}
                  minimumValue={.1}
                  maximumValue={8}
                  step={.01}
                  style={{width:'36%'}}
                  thumbTintColor='orange'
              />
            </View>
          }
          <Space />
          <View style={s.row}>
            <Text style={s.prop}>Speed</Text>
            <Slider value={this.props.bag[now].speed}
                onSlidingComplete={v=>this.setspeed(Math.trunc(v),now)} 
                onValueChange={v=>this.setState({speed:Math.trunc(v)})}
                minimumValue={0}
                maximumValue={400}
                step={1}
                style={{width:'50%'}}
                thumbTintColor='orange'
            />
            <Text style={[s.prop,{width:40}]}>{this.state.speed}</Text>
          </View>
          <Space />
          <View style={s.row}>
            <Text style={s.prop}>Count</Text>
            <Slider value={this.props.bag[now].count}
                onSlidingComplete={v=>this.setcount(Math.trunc(v),now)} 
                onValueChange={v=>this.setState({count:Math.trunc(v)})}
                minimumValue={1}
                maximumValue={10}
                step={0}
                style={{width:'50%'}}
                thumbTintColor='orange'
            />
            <Text style={[s.prop,{width:30}]}>{this.state.count}</Text>
          </View>
          <Space />

          <View style={s.row}>
            <Text style={s.prop}> Out of screen </Text>
            <TextInput defaultValue={String(this.props.bag[now].ex)} onSubmitEditing={(v)=>this.setex(v.nativeEvent.text,now)} 
                style={s.txtinput} keyboardType='numeric' maxLength={3}/>
          </View>
          <Space height={40}/>
          
          <View style={[s.row, {justifyContent:'space-evenly'}]}>
            {this.props.bag[now].source!==null && <Image source={Number.isInteger(this.props.bag[now].source)?
              bub[this.props.bag[now].source]:{uri:this.props.bag[now].source}} style={[s.img,s[this.props.bag[now].shape]]} />
            }
            
            <View style={{justifyContent:"space-evenly"}}>
              <TouchableOpacity onPress={this.upload} onLongPress={()=>tip('image to show inside item')}>
                <Text style={s.txtimg}>Upload</Text>
              </TouchableOpacity>
              {this.props.bag[now].source!==null && 
              <TouchableOpacity onPress={this.removeimg} onLongPress={()=>tip('remove image inside item')}>
                <Text style={[s.txtimg, {backgroundColor:'orangered'}]}>Remove</Text>
              </TouchableOpacity>}
            </View>
          </View>
          <Space />
          
        </View>
        )}
      </ScrollView>
    )
    return (
        <View style={[s.menu,this.props.show?{}:{height:0,borderWidth:0}]}>
          {!this.props.show?null:
          <Touchop onPress={()=>{this.la();this.setState({menu:true})}} style={s.butmenu2}>
            <Icon name="settings" size={30} color="darkgreen" />
          </Touchop>}

          <ScrollView style={[s.submenu,{width:'36%'},this.props.show?null:{padding:0}]}>
            <Text style={s.center}>Items</Text>
            <SeparatorH />
            <Space height={20} />
            {items}
          </ScrollView>

          <SeparatorV />
          {itemProp}

          {!this.state.menu || !this.props.show?null: 
          <View style={{position:'absolute',left: 0, right: 0,top:40,justifyContent: 'center', alignItems: 'center'}}>
            <View style={s.model}>
                <Mybut style={s.cross} onPress={()=>this.setState({menu:false})}>
                  <Text style={{fontSize:20,padding:4}}>Settings</Text>
                  <Text style={{fontSize:20,padding:4}}>❌</Text>
                </Mybut>
                {/* <Button title='❌' style={s.cross} onPress={()=>this.setState({menu:false})} /> */}
                <Space />
                <Mybut style={{backgroundColor:'dodgerblue'}} 
                  onPress={this.changebg}><Text style={s.modeltxt}>Change background image</Text></Mybut>
                <Space />
                <Mybut style={{backgroundColor:'dodgerblue'}} 
                  onPress={this.reset}><Text style={[s.modeltxt,{backgroundColor:'orangered'}]}>Reset</Text></Mybut>
                <Space />
            </View>
          </View>}

          {!this.state.adding || !this.props.show?null: 
          <View style={{position:'absolute',left: 0, right: 0,top:40,justifyContent: 'center', alignItems: 'center'}}>
            <View style={[s.model,{width:240}]}>
                <Mybut style={s.cross} onPress={()=>this.setState({adding:false})}>
                  <Text style={{fontSize:20,padding:4}}>New Item</Text>
                  <Text style={{fontSize:20,padding:4}}>❌</Text>
                </Mybut>
                {/* <Button title='❌' style={s.cross} onPress={()=>this.setState({menu:false})} /> */}
                <Space />
                <TextInput placeholder='Item name' onChangeText={v=>{itemname=v}} style={[s.txtinput,{width:220}]}/>
                <Space />
                <Mybut style={{backgroundColor:'dodgerblue'}} onPress={this.additem}><Text style={s.modeltxt}>Add</Text></Mybut>
                <Space />
            </View>
          </View>}
          

        </View>
    )
  }
}

class App extends Component{
  constructor(props){
    super(props)
    this.state = {
      obj:initobj,
      menu:false,
    }
    this.showmenu = this.showmenu.bind(this)
    this.setbag = this.setbag.bind(this)
    this.backPress = this.backPress.bind(this)
    BackHandler.addEventListener(
      "hardwareBackPress",
      this.backPress
    )
    KeepAwake.activate()

    readlog().then(v=>{this.setState({obj:v,menu:false})}) //calling promise in construtor!!!!
  }
  componentDidMount(){
    SplashScreen.hide()
  }

  backPress(){
    if(this.state.menu){
      this.showmenu()
    }
    else{
      Alert.alert('Confirm','Do you really want to leave 🙁',[
        {text:'Stay ❤'},
        {text:'Bye 👋🏻',onPress:()=>BackHandler.exitApp()}
      ],{cancelable:true})
    }
    return true
  }

  showmenu(){
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({menu:!this.state.menu})
  }
  setbag(obj){
    this.setState({obj})
    log(obj)
  }


  render(){
    let bag= [],ind=0;
    for(let i of this.state.obj){
      if(i.show)
      bag.push(<Itemset key={ind} kee={'set'+ind++} {...i} />)
    }
    return (
      <ImageBackground source={Number.isInteger(this.state.obj[this.state.obj.length-1].source)?
        bub[3]:{uri:this.state.obj[this.state.obj.length-1].source}} style={{}}>
        <View style={{height:'100%'}}>
          <StatusBar backgroundColor='#0000' translucent hidden/>
          {bag}
          <Menu bag={this.state.obj}  setobj={this.setbag} closemenu={this.showmenu} show={this.state.menu} />
          <Touchop onPress={this.showmenu} style={s.butmenu}>
            <Icon name="menu" size={30} color="darkgreen" />
          </Touchop>
          
        </View>
      </ImageBackground>
    )
  }
  
}

//styling
const s = StyleSheet.create({
  w100:{
    width:'100%',
    height:'100%'
  },
  loader:{
    width:'100%',
    height:'100%',
    justifyContent:'center',
    position:'absolute',
    backgroundColor:'azure'
  },
  modeltxt:{
    textAlign:'center',
    fontSize:20,
    color:'ghostwhite',
  },
  box:{
    position:'absolute',
    width:100,
    height:100,
    overflow:'hidden'
  },
  circle:{
    borderRadius:100,
  },
  square:{
    borderRadius:4,
  },
  main:{
    backgroundColor:'azure'
  },
  butmenu:{
    position:'absolute',
    top:10,
    left:10,
  },
  butmenu2:{
    position:'absolute',
    zIndex:2,
    top:4,
    right:10,
  },
  
  menu:{
    flexDirection:'row',
    position:'absolute',
    top:'6%',
    left:'2%',
    width:'96%',
    height:'93%',
    padding:0,
    margin:0,
    backgroundColor:'#beef',
    borderWidth:4,
    borderColor:'#ace',
    opacity:1,
    borderRadius:20,

  },
  submenu:{
    padding:4,
  },
  separatorV: {
    borderBottomColor: '#737373',
    borderLeftWidth: 1,
  },
  separatorH: {
    borderBottomColor: '#737373',
    borderTopWidth: 1,
  },
  center:{
    textAlign:'center',
    fontSize:24,
    fontWeight:'bold',
    color:'brown',
  },
  row:{
    flexDirection:'row',
    justifyContent:'space-between',
  },
  prop:{
    fontSize:20,
    textAlignVertical:'center'
  },
  txtinput:{
    width:'30%',
    borderColor:'powderblue',
    borderWidth:2,
    borderRadius:10,
    padding:4,
    textAlign:'center',
    paddingHorizontal:10,
    backgroundColor:'azure',
  },
  txtimg:{
    backgroundColor:'dodgerblue',
    borderRadius:4,
    padding:6,
    fontSize:18,
    textAlign:'center',
    textAlignVertical:'center',
    color:'ghostwhite'
  },
  img:{
    width:100,
    height:100
  },
  model:{
    flex: 1,
    padding:10,
    paddingTop:30,
    margin:50,
    backgroundColor:'skyblue',
    borderColor:'dodgerblue',
    borderRadius:10,
  },
  cross:{
    borderRadius:4,
    flexDirection:'row',
    justifyContent:'space-between',
    top:-20,
    padding:4,
    backgroundColor:'green',
    overflow:'hidden'
  }
})

export default App;
//adb -s 16e9e4560205 reverse tcp:8081 tcp:8081
// no way to suppy static local images using image uri