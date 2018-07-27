/**
 * Cesium - https://github.com/AnalyticalGraphicsInc/cesium
 *
 * Copyright 2011-2017 Cesium Contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Columbus View (Pat. Pend.)
 *
 * Portions licensed separately.
 * See https://github.com/AnalyticalGraphicsInc/cesium/blob/master/LICENSE.md for full licensing details.
 */
/**
@license
mersenne-twister.js - https://gist.github.com/banksean/300494

   Copyright (C) 1997 - 2002, Makoto Matsumoto and Takuji Nishimura,
   All rights reserved.

   Redistribution and use in source and binary forms, with or without
   modification, are permitted provided that the following conditions
   are met:

     1. Redistributions of source code must retain the above copyright
        notice, this list of conditions and the following disclaimer.

     2. Redistributions in binary form must reproduce the above copyright
        notice, this list of conditions and the following disclaimer in the
        documentation and/or other materials provided with the distribution.

     3. The names of its contributors may not be used to endorse or promote
        products derived from this software without specific prior written
        permission.

   THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
   "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
   LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
   A PARTICULAR PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT OWNER OR
   CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
   EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
   PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
   PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
   LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
   NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
   SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

!function(){define("Core/defined",[],function(){"use strict";function t(t){return void 0!==t&&null!==t}return t}),define("Core/DeveloperError",["./defined"],function(t){"use strict";function e(t){this.name="DeveloperError",this.message=t;var e;try{throw new Error}catch(t){e=t.stack}this.stack=e}return t(Object.create)&&(e.prototype=Object.create(Error.prototype),e.prototype.constructor=e),e.prototype.toString=function(){var e=this.name+": "+this.message;return t(this.stack)&&(e+="\n"+this.stack.toString()),e},e.throwInstantiationError=function(){throw new e("This function defines an interface and should not be called directly.")},e}),define("Core/Check",["./defined","./DeveloperError"],function(t,e){"use strict";function n(t){return t+" is required, actual value was undefined"}function r(t,e,n){return"Expected "+n+" to be typeof "+e+", actual typeof was "+t}var a={};return a.typeOf={},a.defined=function(r,a){if(!t(a))throw new e(n(r))},a.typeOf.func=function(t,n){if("function"!=typeof n)throw new e(r(typeof n,"function",t))},a.typeOf.string=function(t,n){if("string"!=typeof n)throw new e(r(typeof n,"string",t))},a.typeOf.number=function(t,n){if("number"!=typeof n)throw new e(r(typeof n,"number",t))},a.typeOf.number.lessThan=function(t,n,r){if(a.typeOf.number(t,n),n>=r)throw new e("Expected "+t+" to be less than "+r+", actual value was "+n)},a.typeOf.number.lessThanOrEquals=function(t,n,r){if(a.typeOf.number(t,n),n>r)throw new e("Expected "+t+" to be less than or equal to "+r+", actual value was "+n)},a.typeOf.number.greaterThan=function(t,n,r){if(a.typeOf.number(t,n),n<=r)throw new e("Expected "+t+" to be greater than "+r+", actual value was "+n)},a.typeOf.number.greaterThanOrEquals=function(t,n,r){if(a.typeOf.number(t,n),n<r)throw new e("Expected "+t+" to be greater than or equal to"+r+", actual value was "+n)},a.typeOf.object=function(t,n){if("object"!=typeof n)throw new e(r(typeof n,"object",t))},a.typeOf.bool=function(t,n){if("boolean"!=typeof n)throw new e(r(typeof n,"boolean",t))},a.typeOf.number.equals=function(t,n,r,i){if(a.typeOf.number(t,r),a.typeOf.number(n,i),r!==i)throw new e(t+" must be equal to "+n+", the actual values are "+r+" and "+i)},a}),define("Core/freezeObject",["./defined"],function(t){"use strict";var e=Object.freeze;return t(e)||(e=function(t){return t}),e}),define("Core/defaultValue",["./freezeObject"],function(t){"use strict";function e(t,e){return void 0!==t&&null!==t?t:e}return e.EMPTY_OBJECT=t({}),e}),define("ThirdParty/mersenne-twister",[],function(){var t=function(t){void 0==t&&(t=(new Date).getTime()),this.N=624,this.M=397,this.MATRIX_A=2567483615,this.UPPER_MASK=2147483648,this.LOWER_MASK=2147483647,this.mt=new Array(this.N),this.mti=this.N+1,this.init_genrand(t)};return t.prototype.init_genrand=function(t){for(this.mt[0]=t>>>0,this.mti=1;this.mti<this.N;this.mti++){var t=this.mt[this.mti-1]^this.mt[this.mti-1]>>>30;this.mt[this.mti]=(1812433253*((4294901760&t)>>>16)<<16)+1812433253*(65535&t)+this.mti,this.mt[this.mti]>>>=0}},t.prototype.genrand_int32=function(){var t,e=new Array(0,this.MATRIX_A);if(this.mti>=this.N){var n;for(this.mti==this.N+1&&this.init_genrand(5489),n=0;n<this.N-this.M;n++)t=this.mt[n]&this.UPPER_MASK|this.mt[n+1]&this.LOWER_MASK,this.mt[n]=this.mt[n+this.M]^t>>>1^e[1&t];for(;n<this.N-1;n++)t=this.mt[n]&this.UPPER_MASK|this.mt[n+1]&this.LOWER_MASK,this.mt[n]=this.mt[n+(this.M-this.N)]^t>>>1^e[1&t];t=this.mt[this.N-1]&this.UPPER_MASK|this.mt[0]&this.LOWER_MASK,this.mt[this.N-1]=this.mt[this.M-1]^t>>>1^e[1&t],this.mti=0}return t=this.mt[this.mti++],t^=t>>>11,t^=t<<7&2636928640,t^=t<<15&4022730752,t^=t>>>18,t>>>0},t.prototype.random=function(){return this.genrand_int32()*(1/4294967296)},t}),define("Core/Math",["../ThirdParty/mersenne-twister","./defaultValue","./defined","./DeveloperError"],function(t,e,n,r){"use strict";function a(t){var e=Math.pow(Math.abs(t),1/3);return t<0?-e:e}var i={};i.EPSILON1=.1,i.EPSILON2=.01,i.EPSILON3=.001,i.EPSILON4=1e-4,i.EPSILON5=1e-5,i.EPSILON6=1e-6,i.EPSILON7=1e-7,i.EPSILON8=1e-8,i.EPSILON9=1e-9,i.EPSILON10=1e-10,i.EPSILON11=1e-11,i.EPSILON12=1e-12,i.EPSILON13=1e-13,i.EPSILON14=1e-14,i.EPSILON15=1e-15,i.EPSILON16=1e-16,i.EPSILON17=1e-17,i.EPSILON18=1e-18,i.EPSILON19=1e-19,i.EPSILON20=1e-20,i.GRAVITATIONALPARAMETER=3986004418e5,i.SOLAR_RADIUS=6955e5,i.LUNAR_RADIUS=1737400,i.SIXTY_FOUR_KILOBYTES=65536,i.sign=function(t){return t>0?1:t<0?-1:0},i.signNotZero=function(t){return t<0?-1:1},i.toSNorm=function(t,n){return n=e(n,255),Math.round((.5*i.clamp(t,-1,1)+.5)*n)},i.fromSNorm=function(t,n){return n=e(n,255),i.clamp(t,0,n)/n*2-1},i.sinh=function(t){var e=Math.pow(Math.E,t),n=Math.pow(Math.E,-1*t);return.5*(e-n)},i.cosh=function(t){var e=Math.pow(Math.E,t),n=Math.pow(Math.E,-1*t);return.5*(e+n)},i.lerp=function(t,e,n){return(1-n)*t+n*e},i.PI=Math.PI,i.ONE_OVER_PI=1/Math.PI,i.PI_OVER_TWO=.5*Math.PI,i.PI_OVER_THREE=Math.PI/3,i.PI_OVER_FOUR=Math.PI/4,i.PI_OVER_SIX=Math.PI/6,i.THREE_PI_OVER_TWO=3*Math.PI*.5,i.TWO_PI=2*Math.PI,i.ONE_OVER_TWO_PI=1/(2*Math.PI),i.RADIANS_PER_DEGREE=Math.PI/180,i.DEGREES_PER_RADIAN=180/Math.PI,i.RADIANS_PER_ARCSECOND=i.RADIANS_PER_DEGREE/3600,i.toRadians=function(t){return t*i.RADIANS_PER_DEGREE},i.toDegrees=function(t){return t*i.DEGREES_PER_RADIAN},i.convertLongitudeRange=function(t){var e=i.TWO_PI,n=t-Math.floor(t/e)*e;return n<-Math.PI?n+e:n>=Math.PI?n-e:n},i.clampToLatitudeRange=function(t){return i.clamp(t,-1*i.PI_OVER_TWO,i.PI_OVER_TWO)},i.negativePiToPi=function(t){return i.zeroToTwoPi(t+i.PI)-i.PI},i.zeroToTwoPi=function(t){var e=i.mod(t,i.TWO_PI);return Math.abs(e)<i.EPSILON14&&Math.abs(t)>i.EPSILON14?i.TWO_PI:e},i.mod=function(t,e){return(t%e+e)%e},i.equalsEpsilon=function(t,n,r,a){a=e(a,r);var i=Math.abs(t-n);return i<=a||i<=r*Math.max(Math.abs(t),Math.abs(n))};var o=[1];i.factorial=function(t){var e=o.length;if(t>=e)for(var n=o[e-1],r=e;r<=t;r++)o.push(n*r);return o[t]},i.incrementWrap=function(t,n,r){return r=e(r,0),++t,t>n&&(t=r),t},i.isPowerOfTwo=function(t){return 0!==t&&0===(t&t-1)},i.nextPowerOfTwo=function(t){return--t,t|=t>>1,t|=t>>2,t|=t>>4,t|=t>>8,t|=t>>16,++t,t},i.clamp=function(t,e,n){return t<e?e:t>n?n:t};var u=new t;return i.setRandomNumberSeed=function(e){u=new t(e)},i.nextRandomNumber=function(){return u.random()},i.randomBetween=function(t,e){return i.nextRandomNumber()*(e-t)+t},i.acosClamped=function(t){return Math.acos(i.clamp(t,-1,1))},i.asinClamped=function(t){return Math.asin(i.clamp(t,-1,1))},i.chordLength=function(t,e){return 2*e*Math.sin(.5*t)},i.logBase=function(t,e){return Math.log(t)/Math.log(e)},i.cbrt=n(Math.cbrt)?Math.cbrt:a,i.fog=function(t,e){var n=t*e;return 1-Math.exp(-(n*n))},i}),define("Core/Cartesian2",["./Check","./defaultValue","./defined","./DeveloperError","./freezeObject","./Math"],function(t,e,n,r,a,i){"use strict";function o(t,n){this.x=e(t,0),this.y=e(n,0)}o.fromElements=function(t,e,r){return n(r)?(r.x=t,r.y=e,r):new o(t,e)},o.clone=function(t,e){if(n(t))return n(e)?(e.x=t.x,e.y=t.y,e):new o(t.x,t.y)},o.fromCartesian3=o.clone,o.fromCartesian4=o.clone,o.packedLength=2,o.pack=function(t,n,r){return r=e(r,0),n[r++]=t.x,n[r]=t.y,n},o.unpack=function(t,r,a){return r=e(r,0),n(a)||(a=new o),a.x=t[r++],a.y=t[r],a},o.packArray=function(t,e){var r=t.length;n(e)?e.length=2*r:e=new Array(2*r);for(var a=0;a<r;++a)o.pack(t[a],e,2*a);return e},o.unpackArray=function(t,e){var r=t.length;n(e)?e.length=r/2:e=new Array(r/2);for(var a=0;a<r;a+=2){var i=a/2;e[i]=o.unpack(t,a,e[i])}return e},o.fromArray=o.unpack,o.maximumComponent=function(t){return Math.max(t.x,t.y)},o.minimumComponent=function(t){return Math.min(t.x,t.y)},o.minimumByComponent=function(t,e,n){return n.x=Math.min(t.x,e.x),n.y=Math.min(t.y,e.y),n},o.maximumByComponent=function(t,e,n){return n.x=Math.max(t.x,e.x),n.y=Math.max(t.y,e.y),n},o.magnitudeSquared=function(t){return t.x*t.x+t.y*t.y},o.magnitude=function(t){return Math.sqrt(o.magnitudeSquared(t))};var u=new o;o.distance=function(t,e){return o.subtract(t,e,u),o.magnitude(u)},o.distanceSquared=function(t,e){return o.subtract(t,e,u),o.magnitudeSquared(u)},o.normalize=function(t,e){var n=o.magnitude(t);return e.x=t.x/n,e.y=t.y/n,e},o.dot=function(t,e){return t.x*e.x+t.y*e.y},o.multiplyComponents=function(t,e,n){return n.x=t.x*e.x,n.y=t.y*e.y,n},o.divideComponents=function(t,e,n){return n.x=t.x/e.x,n.y=t.y/e.y,n},o.add=function(t,e,n){return n.x=t.x+e.x,n.y=t.y+e.y,n},o.subtract=function(t,e,n){return n.x=t.x-e.x,n.y=t.y-e.y,n},o.multiplyByScalar=function(t,e,n){return n.x=t.x*e,n.y=t.y*e,n},o.divideByScalar=function(t,e,n){return n.x=t.x/e,n.y=t.y/e,n},o.negate=function(t,e){return e.x=-t.x,e.y=-t.y,e},o.abs=function(t,e){return e.x=Math.abs(t.x),e.y=Math.abs(t.y),e};var s=new o;o.lerp=function(t,e,n,r){return o.multiplyByScalar(e,n,s),r=o.multiplyByScalar(t,1-n,r),o.add(s,r,r)};var c=new o,h=new o;o.angleBetween=function(t,e){return o.normalize(t,c),o.normalize(e,h),i.acosClamped(o.dot(c,h))};var f=new o;return o.mostOrthogonalAxis=function(t,e){var n=o.normalize(t,f);return o.abs(n,n),e=n.x<=n.y?o.clone(o.UNIT_X,e):o.clone(o.UNIT_Y,e)},o.equals=function(t,e){return t===e||n(t)&&n(e)&&t.x===e.x&&t.y===e.y},o.equalsArray=function(t,e,n){return t.x===e[n]&&t.y===e[n+1]},o.equalsEpsilon=function(t,e,r,a){return t===e||n(t)&&n(e)&&i.equalsEpsilon(t.x,e.x,r,a)&&i.equalsEpsilon(t.y,e.y,r,a)},o.ZERO=a(new o(0,0)),o.UNIT_X=a(new o(1,0)),o.UNIT_Y=a(new o(0,1)),o.prototype.clone=function(t){return o.clone(this,t)},o.prototype.equals=function(t){return o.equals(this,t)},o.prototype.equalsEpsilon=function(t,e,n){return o.equalsEpsilon(this,t,e,n)},o.prototype.toString=function(){return"("+this.x+", "+this.y+")"},o}),define("Core/Cartesian3",["./Check","./defaultValue","./defined","./DeveloperError","./freezeObject","./Math"],function(t,e,n,r,a,i){"use strict";function o(t,n,r){this.x=e(t,0),this.y=e(n,0),this.z=e(r,0)}o.fromSpherical=function(t,r){n(r)||(r=new o);var a=t.clock,i=t.cone,u=e(t.magnitude,1),s=u*Math.sin(i);return r.x=s*Math.cos(a),r.y=s*Math.sin(a),r.z=u*Math.cos(i),r},o.fromElements=function(t,e,r,a){return n(a)?(a.x=t,a.y=e,a.z=r,a):new o(t,e,r)},o.clone=function(t,e){if(n(t))return n(e)?(e.x=t.x,e.y=t.y,e.z=t.z,e):new o(t.x,t.y,t.z)},o.fromCartesian4=o.clone,o.packedLength=3,o.pack=function(t,n,r){return r=e(r,0),n[r++]=t.x,n[r++]=t.y,n[r]=t.z,n},o.unpack=function(t,r,a){return r=e(r,0),n(a)||(a=new o),a.x=t[r++],a.y=t[r++],a.z=t[r],a},o.packArray=function(t,e){var r=t.length;n(e)?e.length=3*r:e=new Array(3*r);for(var a=0;a<r;++a)o.pack(t[a],e,3*a);return e},o.unpackArray=function(t,e){var r=t.length;n(e)?e.length=r/3:e=new Array(r/3);for(var a=0;a<r;a+=3){var i=a/3;e[i]=o.unpack(t,a,e[i])}return e},o.fromArray=o.unpack,o.maximumComponent=function(t){return Math.max(t.x,t.y,t.z)},o.minimumComponent=function(t){return Math.min(t.x,t.y,t.z)},o.minimumByComponent=function(t,e,n){return n.x=Math.min(t.x,e.x),n.y=Math.min(t.y,e.y),n.z=Math.min(t.z,e.z),n},o.maximumByComponent=function(t,e,n){return n.x=Math.max(t.x,e.x),n.y=Math.max(t.y,e.y),n.z=Math.max(t.z,e.z),n},o.magnitudeSquared=function(t){return t.x*t.x+t.y*t.y+t.z*t.z},o.magnitude=function(t){return Math.sqrt(o.magnitudeSquared(t))};var u=new o;o.distance=function(t,e){return o.subtract(t,e,u),o.magnitude(u)},o.distanceSquared=function(t,e){return o.subtract(t,e,u),o.magnitudeSquared(u)},o.normalize=function(t,e){var n=o.magnitude(t);return 0===n?e=o.ZERO:(e.x=t.x/n,e.y=t.y/n,e.z=t.z/n,e)},o.dot=function(t,e){return t.x*e.x+t.y*e.y+t.z*e.z},o.multiplyComponents=function(t,e,n){return n.x=t.x*e.x,n.y=t.y*e.y,n.z=t.z*e.z,n},o.divideComponents=function(t,e,n){return n.x=t.x/e.x,n.y=t.y/e.y,n.z=t.z/e.z,n},o.add=function(t,e,n){return n.x=t.x+e.x,n.y=t.y+e.y,n.z=t.z+e.z,n},o.subtract=function(t,e,n){return n.x=t.x-e.x,n.y=t.y-e.y,n.z=t.z-e.z,n},o.multiplyByScalar=function(t,e,n){return n.x=t.x*e,n.y=t.y*e,n.z=t.z*e,n},o.divideByScalar=function(t,e,n){return n.x=t.x/e,n.y=t.y/e,n.z=t.z/e,n},o.negate=function(t,e){return e.x=-t.x,e.y=-t.y,e.z=-t.z,e},o.abs=function(t,e){return e.x=Math.abs(t.x),e.y=Math.abs(t.y),e.z=Math.abs(t.z),e};var s=new o;o.lerp=function(t,e,n,r){return o.multiplyByScalar(e,n,s),r=o.multiplyByScalar(t,1-n,r),o.add(s,r,r)};var c=new o,h=new o;o.angleBetween=function(t,e){o.normalize(t,c),o.normalize(e,h);var n=o.dot(c,h),r=o.magnitude(o.cross(c,h,c));return Math.atan2(r,n)};var f=new o;o.mostOrthogonalAxis=function(t,e){var n=o.normalize(t,f);return o.abs(n,n),e=n.x<=n.y?n.x<=n.z?o.clone(o.UNIT_X,e):o.clone(o.UNIT_Z,e):n.y<=n.z?o.clone(o.UNIT_Y,e):o.clone(o.UNIT_Z,e)},o.projectVector=function(t,e,n){var r=o.dot(t,e)/o.dot(e,e);return o.multiplyByScalar(e,r,n)},o.equals=function(t,e){return t===e||n(t)&&n(e)&&t.x===e.x&&t.y===e.y&&t.z===e.z},o.equalsArray=function(t,e,n){return t.x===e[n]&&t.y===e[n+1]&&t.z===e[n+2]},o.equalsEpsilon=function(t,e,r,a){return t===e||n(t)&&n(e)&&i.equalsEpsilon(t.x,e.x,r,a)&&i.equalsEpsilon(t.y,e.y,r,a)&&i.equalsEpsilon(t.z,e.z,r,a)},o.cross=function(t,e,n){var r=t.x,a=t.y,i=t.z,o=e.x,u=e.y,s=e.z,c=a*s-i*u,h=i*o-r*s,f=r*u-a*o;return n.x=c,n.y=h,n.z=f,n},o.fromDegrees=function(t,e,n,r,a){return t=i.toRadians(t),e=i.toRadians(e),o.fromRadians(t,e,n,r,a)};var d=new o,l=new o,m=new o(40680631590769,40680631590769,40408299984661.445);return o.fromRadians=function(t,r,a,i,u){a=e(a,0);var s=n(i)?i.radiiSquared:m,c=Math.cos(r);d.x=c*Math.cos(t),d.y=c*Math.sin(t),d.z=Math.sin(r),d=o.normalize(d,d),o.multiplyComponents(s,d,l);var h=Math.sqrt(o.dot(d,l));return l=o.divideByScalar(l,h,l),d=o.multiplyByScalar(d,a,d),n(u)||(u=new o),o.add(l,d,u)},o.fromDegreesArray=function(t,e,r){var a=t.length;n(r)?r.length=a/2:r=new Array(a/2);for(var i=0;i<a;i+=2){var u=t[i],s=t[i+1],c=i/2;r[c]=o.fromDegrees(u,s,0,e,r[c])}return r},o.fromRadiansArray=function(t,e,r){var a=t.length;n(r)?r.length=a/2:r=new Array(a/2);for(var i=0;i<a;i+=2){var u=t[i],s=t[i+1],c=i/2;r[c]=o.fromRadians(u,s,0,e,r[c])}return r},o.fromDegreesArrayHeights=function(t,e,r){var a=t.length;n(r)?r.length=a/3:r=new Array(a/3);for(var i=0;i<a;i+=3){var u=t[i],s=t[i+1],c=t[i+2],h=i/3;r[h]=o.fromDegrees(u,s,c,e,r[h])}return r},o.fromRadiansArrayHeights=function(t,e,r){var a=t.length;n(r)?r.length=a/3:r=new Array(a/3);for(var i=0;i<a;i+=3){var u=t[i],s=t[i+1],c=t[i+2],h=i/3;r[h]=o.fromRadians(u,s,c,e,r[h])}return r},o.ZERO=a(new o(0,0,0)),o.UNIT_X=a(new o(1,0,0)),o.UNIT_Y=a(new o(0,1,0)),o.UNIT_Z=a(new o(0,0,1)),o.prototype.clone=function(t){return o.clone(this,t)},o.prototype.equals=function(t){return o.equals(this,t)},o.prototype.equalsEpsilon=function(t,e,n){return o.equalsEpsilon(this,t,e,n)},o.prototype.toString=function(){return"("+this.x+", "+this.y+", "+this.z+")"},o}),define("Core/AttributeCompression",["./Cartesian2","./Cartesian3","./Check","./defined","./DeveloperError","./Math"],function(t,e,n,r,a,i){"use strict";function o(t){return t>>1^-(1&t)}var u={};u.octEncodeInRange=function(t,e,n){if(n.x=t.x/(Math.abs(t.x)+Math.abs(t.y)+Math.abs(t.z)),n.y=t.y/(Math.abs(t.x)+Math.abs(t.y)+Math.abs(t.z)),t.z<0){var r=n.x,a=n.y;n.x=(1-Math.abs(a))*i.signNotZero(r),n.y=(1-Math.abs(r))*i.signNotZero(a)}return n.x=i.toSNorm(n.x,e),n.y=i.toSNorm(n.y,e),n},u.octEncode=function(t,e){return u.octEncodeInRange(t,255,e)},u.octDecodeInRange=function(t,n,r,a){if(a.x=i.fromSNorm(t,r),a.y=i.fromSNorm(n,r),a.z=1-(Math.abs(a.x)+Math.abs(a.y)),a.z<0){var o=a.x;a.x=(1-Math.abs(a.y))*i.signNotZero(o),a.y=(1-Math.abs(o))*i.signNotZero(a.y)}return e.normalize(a,a)},u.octDecode=function(t,e,n){return u.octDecodeInRange(t,e,255,n)},u.octPackFloat=function(t){return 256*t.x+t.y};var s=new t;return u.octEncodeFloat=function(t){return u.octEncode(t,s),u.octPackFloat(s)},u.octDecodeFloat=function(t,e){var n=t/256,r=Math.floor(n),a=256*(n-r);return u.octDecode(r,a,e)},u.octPack=function(t,e,n,r){var a=u.octEncodeFloat(t),i=u.octEncodeFloat(e),o=u.octEncode(n,s);return r.x=65536*o.x+a,r.y=65536*o.y+i,r},u.octUnpack=function(t,e,n,r){var a=t.x/65536,i=Math.floor(a),o=65536*(a-i);a=t.y/65536;var s=Math.floor(a),c=65536*(a-s);u.octDecodeFloat(o,e),u.octDecodeFloat(c,n),u.octDecode(i,s,r)},u.compressTextureCoordinates=function(t){var e=4095*t.x|0,n=4095*t.y|0;return 4096*e+n},u.decompressTextureCoordinates=function(t,e){var n=t/4096,r=Math.floor(n);return e.x=r/4095,e.y=(t-4096*r)/4095,e},u.zigZagDeltaDecode=function(t,e,n){for(var a=t.length,i=0,u=0,s=0,c=0;c<a;++c)i+=o(t[c]),u+=o(e[c]),t[c]=i,e[c]=u,r(n)&&(s+=o(n[c]),n[c]=s)},u}),define("Core/scaleToGeodeticSurface",["./Cartesian3","./defined","./DeveloperError","./Math"],function(t,e,n,r){"use strict";function a(n,a,u,s,c){var h=n.x,f=n.y,d=n.z,l=a.x,m=a.y,y=a.z,p=h*h*l*l,g=f*f*m*m,v=d*d*y*y,w=p+g+v,x=Math.sqrt(1/w),M=t.multiplyByScalar(n,x,i);if(w<s)return isFinite(x)?t.clone(M,c):void 0;var _=u.x,E=u.y,O=u.z,S=o;S.x=M.x*_*2,S.y=M.y*E*2,S.z=M.z*O*2;var P,R,I,T,b,A,z,N,C,q,L,k=(1-x)*t.magnitude(n)/(.5*t.magnitude(S)),D=0;do{k-=D,I=1/(1+k*_),T=1/(1+k*E),b=1/(1+k*O),A=I*I,z=T*T,N=b*b,C=A*I,q=z*T,L=N*b,P=p*A+g*z+v*N-1,R=p*C*_+g*q*E+v*L*O;var W=-2*R;D=P/W}while(Math.abs(P)>r.EPSILON12);return e(c)?(c.x=h*I,c.y=f*T,c.z=d*b,c):new t(h*I,f*T,d*b)}var i=new t,o=new t;return a}),define("Core/Cartographic",["./Cartesian3","./Check","./defaultValue","./defined","./freezeObject","./Math","./scaleToGeodeticSurface"],function(t,e,n,r,a,i,o){"use strict";function u(t,e,r){this.longitude=n(t,0),this.latitude=n(e,0),this.height=n(r,0)}u.fromRadians=function(t,e,a,i){return a=n(a,0),r(i)?(i.longitude=t,i.latitude=e,i.height=a,i):new u(t,e,a)},u.fromDegrees=function(t,e,n,r){return t=i.toRadians(t),e=i.toRadians(e),u.fromRadians(t,e,n,r)};var s=new t,c=new t,h=new t,f=new t(1/6378137,1/6378137,1/6356752.314245179),d=new t(1/40680631590769,1/40680631590769,1/40408299984661.445),l=i.EPSILON1;return u.fromCartesian=function(e,n,a){var m=r(n)?n.oneOverRadii:f,y=r(n)?n.oneOverRadiiSquared:d,p=r(n)?n._centerToleranceSquared:l,g=o(e,m,y,p,c);if(r(g)){var v=t.multiplyComponents(g,y,s);v=t.normalize(v,v);var w=t.subtract(e,g,h),x=Math.atan2(v.y,v.x),M=Math.asin(v.z),_=i.sign(t.dot(w,e))*t.magnitude(w);return r(a)?(a.longitude=x,a.latitude=M,a.height=_,a):new u(x,M,_)}},u.toCartesian=function(e,n,r){return t.fromRadians(e.longitude,e.latitude,e.height,n,r)},u.clone=function(t,e){if(r(t))return r(e)?(e.longitude=t.longitude,e.latitude=t.latitude,e.height=t.height,e):new u(t.longitude,t.latitude,t.height)},u.equals=function(t,e){return t===e||r(t)&&r(e)&&t.longitude===e.longitude&&t.latitude===e.latitude&&t.height===e.height},u.equalsEpsilon=function(t,e,n){return t===e||r(t)&&r(e)&&Math.abs(t.longitude-e.longitude)<=n&&Math.abs(t.latitude-e.latitude)<=n&&Math.abs(t.height-e.height)<=n},u.ZERO=a(new u(0,0,0)),u.prototype.clone=function(t){return u.clone(this,t)},u.prototype.equals=function(t){return u.equals(this,t)},u.prototype.equalsEpsilon=function(t,e){return u.equalsEpsilon(this,t,e)},u.prototype.toString=function(){return"("+this.longitude+", "+this.latitude+", "+this.height+")"},u}),define("Core/defineProperties",["./defined"],function(t){"use strict";var e=function(){try{return"x"in Object.defineProperty({},"x",{})}catch(t){return!1}}(),n=Object.defineProperties;return e&&t(n)||(n=function(t){return t}),n}),define("Core/Ellipsoid",["./Cartesian3","./Cartographic","./Check","./defaultValue","./defined","./defineProperties","./DeveloperError","./freezeObject","./Math","./scaleToGeodeticSurface"],function(t,e,n,r,a,i,o,u,s,c){"use strict";function h(e,n,a,i){n=r(n,0),a=r(a,0),i=r(i,0),e._radii=new t(n,a,i),e._radiiSquared=new t(n*n,a*a,i*i),e._radiiToTheFourth=new t(n*n*n*n,a*a*a*a,i*i*i*i),e._oneOverRadii=new t(0===n?0:1/n,0===a?0:1/a,0===i?0:1/i),e._oneOverRadiiSquared=new t(0===n?0:1/(n*n),0===a?0:1/(a*a),0===i?0:1/(i*i)),e._minimumRadius=Math.min(n,a,i),e._maximumRadius=Math.max(n,a,i),e._centerToleranceSquared=s.EPSILON1,0!==e._radiiSquared.z&&(e._squaredXOverSquaredZ=e._radiiSquared.x/e._radiiSquared.z)}function f(t,e,n){this._radii=void 0,this._radiiSquared=void 0,this._radiiToTheFourth=void 0,this._oneOverRadii=void 0,this._oneOverRadiiSquared=void 0,this._minimumRadius=void 0,this._maximumRadius=void 0,this._centerToleranceSquared=void 0,this._squaredXOverSquaredZ=void 0,h(this,t,e,n)}i(f.prototype,{radii:{get:function(){return this._radii}},radiiSquared:{get:function(){return this._radiiSquared}},radiiToTheFourth:{get:function(){return this._radiiToTheFourth}},oneOverRadii:{get:function(){return this._oneOverRadii}},oneOverRadiiSquared:{get:function(){return this._oneOverRadiiSquared}},minimumRadius:{get:function(){return this._minimumRadius}},maximumRadius:{get:function(){return this._maximumRadius}}}),f.clone=function(e,n){if(a(e)){var r=e._radii;return a(n)?(t.clone(r,n._radii),t.clone(e._radiiSquared,n._radiiSquared),t.clone(e._radiiToTheFourth,n._radiiToTheFourth),t.clone(e._oneOverRadii,n._oneOverRadii),t.clone(e._oneOverRadiiSquared,n._oneOverRadiiSquared),n._minimumRadius=e._minimumRadius,n._maximumRadius=e._maximumRadius,n._centerToleranceSquared=e._centerToleranceSquared,n):new f(r.x,r.y,r.z)}},f.fromCartesian3=function(t,e){return a(e)||(e=new f),a(t)?(h(e,t.x,t.y,t.z),e):e},f.WGS84=u(new f(6378137,6378137,6356752.314245179)),f.UNIT_SPHERE=u(new f(1,1,1)),f.MOON=u(new f(s.LUNAR_RADIUS,s.LUNAR_RADIUS,s.LUNAR_RADIUS)),f.prototype.clone=function(t){return f.clone(this,t)},f.packedLength=t.packedLength,f.pack=function(e,n,a){return a=r(a,0),t.pack(e._radii,n,a),n},f.unpack=function(e,n,a){n=r(n,0);var i=t.unpack(e,n);return f.fromCartesian3(i,a)},f.prototype.geocentricSurfaceNormal=t.normalize,f.prototype.geodeticSurfaceNormalCartographic=function(e,n){var r=e.longitude,i=e.latitude,o=Math.cos(i),u=o*Math.cos(r),s=o*Math.sin(r),c=Math.sin(i);return a(n)||(n=new t),n.x=u,n.y=s,n.z=c,t.normalize(n,n)},f.prototype.geodeticSurfaceNormal=function(e,n){return a(n)||(n=new t),n=t.multiplyComponents(e,this._oneOverRadiiSquared,n),t.normalize(n,n)};var d=new t,l=new t;f.prototype.cartographicToCartesian=function(e,n){var r=d,i=l;this.geodeticSurfaceNormalCartographic(e,r),t.multiplyComponents(this._radiiSquared,r,i);var o=Math.sqrt(t.dot(r,i));return t.divideByScalar(i,o,i),t.multiplyByScalar(r,e.height,r),a(n)||(n=new t),t.add(i,r,n)},f.prototype.cartographicArrayToCartesianArray=function(t,e){var n=t.length;a(e)?e.length=n:e=new Array(n);for(var r=0;r<n;r++)e[r]=this.cartographicToCartesian(t[r],e[r]);return e};var m=new t,y=new t,p=new t;return f.prototype.cartesianToCartographic=function(n,r){var i=this.scaleToGeodeticSurface(n,y);if(a(i)){var o=this.geodeticSurfaceNormal(i,m),u=t.subtract(n,i,p),c=Math.atan2(o.y,o.x),h=Math.asin(o.z),f=s.sign(t.dot(u,n))*t.magnitude(u);return a(r)?(r.longitude=c,r.latitude=h,r.height=f,r):new e(c,h,f)}},f.prototype.cartesianArrayToCartographicArray=function(t,e){var n=t.length;a(e)?e.length=n:e=new Array(n);for(var r=0;r<n;++r)e[r]=this.cartesianToCartographic(t[r],e[r]);return e},f.prototype.scaleToGeodeticSurface=function(t,e){return c(t,this._oneOverRadii,this._oneOverRadiiSquared,this._centerToleranceSquared,e)},f.prototype.scaleToGeocentricSurface=function(e,n){a(n)||(n=new t);var r=e.x,i=e.y,o=e.z,u=this._oneOverRadiiSquared,s=1/Math.sqrt(r*r*u.x+i*i*u.y+o*o*u.z);return t.multiplyByScalar(e,s,n)},f.prototype.transformPositionToScaledSpace=function(e,n){return a(n)||(n=new t),t.multiplyComponents(e,this._oneOverRadii,n)},f.prototype.transformPositionFromScaledSpace=function(e,n){return a(n)||(n=new t),t.multiplyComponents(e,this._radii,n)},f.prototype.equals=function(e){return this===e||a(e)&&t.equals(this._radii,e._radii)},f.prototype.toString=function(){return this._radii.toString()},f.prototype.getSurfaceNormalIntersectionWithZAxis=function(e,n,i){n=r(n,0);var o=this._squaredXOverSquaredZ;if(a(i)||(i=new t),i.x=0,i.y=0,i.z=e.z*(1-o),!(Math.abs(i.z)>=this._radii.z-n))return i},f}),define("Core/Rectangle",["./Cartographic","./Check","./defaultValue","./defined","./defineProperties","./Ellipsoid","./freezeObject","./Math"],function(t,e,n,r,a,i,o,u){"use strict";function s(t,e,r,a){this.west=n(t,0),this.south=n(e,0),this.east=n(r,0),this.north=n(a,0)}a(s.prototype,{width:{get:function(){return s.computeWidth(this)}},height:{get:function(){return s.computeHeight(this)}}}),s.packedLength=4,s.pack=function(t,e,r){return r=n(r,0),e[r++]=t.west,e[r++]=t.south,e[r++]=t.east,e[r]=t.north,e},s.unpack=function(t,e,a){return e=n(e,0),r(a)||(a=new s),a.west=t[e++],a.south=t[e++],a.east=t[e++],a.north=t[e],a},s.computeWidth=function(t){var e=t.east,n=t.west;return e<n&&(e+=u.TWO_PI),e-n},s.computeHeight=function(t){return t.north-t.south},s.fromDegrees=function(t,e,a,i,o){return t=u.toRadians(n(t,0)),e=u.toRadians(n(e,0)),a=u.toRadians(n(a,0)),i=u.toRadians(n(i,0)),r(o)?(o.west=t,o.south=e,o.east=a,o.north=i,o):new s(t,e,a,i)},s.fromRadians=function(t,e,a,i,o){return r(o)?(o.west=n(t,0),o.south=n(e,0),o.east=n(a,0),o.north=n(i,0),o):new s(t,e,a,i)},s.fromCartographicArray=function(t,e){for(var n=Number.MAX_VALUE,a=-Number.MAX_VALUE,i=Number.MAX_VALUE,o=-Number.MAX_VALUE,c=Number.MAX_VALUE,h=-Number.MAX_VALUE,f=0,d=t.length;f<d;f++){var l=t[f];n=Math.min(n,l.longitude),a=Math.max(a,l.longitude),c=Math.min(c,l.latitude),h=Math.max(h,l.latitude);var m=l.longitude>=0?l.longitude:l.longitude+u.TWO_PI;i=Math.min(i,m),o=Math.max(o,m)}return a-n>o-i&&(n=i,a=o,a>u.PI&&(a-=u.TWO_PI),n>u.PI&&(n-=u.TWO_PI)),r(e)?(e.west=n,e.south=c,e.east=a,e.north=h,e):new s(n,c,a,h)},s.fromCartesianArray=function(t,e,a){e=n(e,i.WGS84);for(var o=Number.MAX_VALUE,c=-Number.MAX_VALUE,h=Number.MAX_VALUE,f=-Number.MAX_VALUE,d=Number.MAX_VALUE,l=-Number.MAX_VALUE,m=0,y=t.length;m<y;m++){var p=e.cartesianToCartographic(t[m]);o=Math.min(o,p.longitude),c=Math.max(c,p.longitude),d=Math.min(d,p.latitude),l=Math.max(l,p.latitude);var g=p.longitude>=0?p.longitude:p.longitude+u.TWO_PI;h=Math.min(h,g),f=Math.max(f,g)}return c-o>f-h&&(o=h,c=f,c>u.PI&&(c-=u.TWO_PI),o>u.PI&&(o-=u.TWO_PI)),r(a)?(a.west=o,a.south=d,a.east=c,a.north=l,a):new s(o,d,c,l)},s.clone=function(t,e){if(r(t))return r(e)?(e.west=t.west,e.south=t.south,e.east=t.east,e.north=t.north,e):new s(t.west,t.south,t.east,t.north)},s.prototype.clone=function(t){return s.clone(this,t)},s.prototype.equals=function(t){return s.equals(this,t)},s.equals=function(t,e){return t===e||r(t)&&r(e)&&t.west===e.west&&t.south===e.south&&t.east===e.east&&t.north===e.north},s.prototype.equalsEpsilon=function(t,e){return r(t)&&Math.abs(this.west-t.west)<=e&&Math.abs(this.south-t.south)<=e&&Math.abs(this.east-t.east)<=e&&Math.abs(this.north-t.north)<=e},s.validate=function(t){},s.southwest=function(e,n){return r(n)?(n.longitude=e.west,n.latitude=e.south,n.height=0,n):new t(e.west,e.south)},s.northwest=function(e,n){return r(n)?(n.longitude=e.west,n.latitude=e.north,n.height=0,n):new t(e.west,e.north)},s.northeast=function(e,n){return r(n)?(n.longitude=e.east,n.latitude=e.north,n.height=0,n):new t(e.east,e.north)},s.southeast=function(e,n){return r(n)?(n.longitude=e.east,n.latitude=e.south,n.height=0,n):new t(e.east,e.south)},s.center=function(e,n){var a=e.east,i=e.west;a<i&&(a+=u.TWO_PI);var o=u.negativePiToPi(.5*(i+a)),s=.5*(e.south+e.north);return r(n)?(n.longitude=o,n.latitude=s,n.height=0,n):new t(o,s)},s.intersection=function(t,e,n){var a=t.east,i=t.west,o=e.east,c=e.west;a<i&&o>0?a+=u.TWO_PI:o<c&&a>0&&(o+=u.TWO_PI),a<i&&c<0?c+=u.TWO_PI:o<c&&i<0&&(i+=u.TWO_PI);var h=u.negativePiToPi(Math.max(i,c)),f=u.negativePiToPi(Math.min(a,o));if(!((t.west<t.east||e.west<e.east)&&f<=h)){var d=Math.max(t.south,e.south),l=Math.min(t.north,e.north);if(!(d>=l))return r(n)?(n.west=h,n.south=d,n.east=f,n.north=l,n):new s(h,d,f,l)}},s.simpleIntersection=function(t,e,n){var a=Math.max(t.west,e.west),i=Math.max(t.south,e.south),o=Math.min(t.east,e.east),u=Math.min(t.north,e.north);if(!(i>=u||a>=o))return r(n)?(n.west=a,n.south=i,n.east=o,n.north=u,n):new s(a,i,o,u)},s.union=function(t,e,n){r(n)||(n=new s);var a=t.east,i=t.west,o=e.east,c=e.west;a<i&&o>0?a+=u.TWO_PI:o<c&&a>0&&(o+=u.TWO_PI),a<i&&c<0?c+=u.TWO_PI:o<c&&i<0&&(i+=u.TWO_PI);var h=u.convertLongitudeRange(Math.min(i,c)),f=u.convertLongitudeRange(Math.max(a,o));return n.west=h,n.south=Math.min(t.south,e.south),n.east=f,n.north=Math.max(t.north,e.north),n},s.expand=function(t,e,n){return r(n)||(n=new s),n.west=Math.min(t.west,e.longitude),n.south=Math.min(t.south,e.latitude),n.east=Math.max(t.east,e.longitude),n.north=Math.max(t.north,e.latitude),n},s.contains=function(t,e){var n=e.longitude,r=e.latitude,a=t.west,i=t.east;return i<a&&(i+=u.TWO_PI,n<0&&(n+=u.TWO_PI)),(n>a||u.equalsEpsilon(n,a,u.EPSILON14))&&(n<i||u.equalsEpsilon(n,i,u.EPSILON14))&&r>=t.south&&r<=t.north};var c=new t;return s.subsample=function(t,e,a,o){e=n(e,i.WGS84),a=n(a,0),r(o)||(o=[]);var h=0,f=t.north,d=t.south,l=t.east,m=t.west,y=c;y.height=a,y.longitude=m,y.latitude=f,o[h]=e.cartographicToCartesian(y,o[h]),h++,y.longitude=l,o[h]=e.cartographicToCartesian(y,o[h]),h++,y.latitude=d,o[h]=e.cartographicToCartesian(y,o[h]),h++,y.longitude=m,o[h]=e.cartographicToCartesian(y,o[h]),h++,f<0?y.latitude=f:d>0?y.latitude=d:y.latitude=0;for(var p=1;p<8;++p)y.longitude=-Math.PI+p*u.PI_OVER_TWO,s.contains(t,y)&&(o[h]=e.cartographicToCartesian(y,o[h]),h++);return 0===y.latitude&&(y.longitude=m,o[h]=e.cartographicToCartesian(y,o[h]),h++,y.longitude=l,o[h]=e.cartographicToCartesian(y,o[h]),h++),o.length=h,o},s.MAX_VALUE=o(new s(-Math.PI,-u.PI_OVER_TWO,Math.PI,u.PI_OVER_TWO)),s}),define("Core/formatError",["./defined"],function(t){"use strict";function e(e){var n,r=e.name,a=e.message;n=t(r)&&t(a)?r+": "+a:e.toString();var i=e.stack;return t(i)&&(n+="\n"+i),n}return e}),define("Workers/createTaskProcessorWorker",["../Core/defaultValue","../Core/defined","../Core/formatError"],function(t,e,n){"use strict";function r(r){var a,i=[],o={id:void 0,result:void 0,error:void 0};return function(u){var s=u.data;i.length=0,o.id=s.id,o.error=void 0,o.result=void 0;try{o.result=r(s.parameters,i)}catch(t){t instanceof Error?o.error={name:t.name,message:t.message,stack:t.stack}:o.error=t}e(a)||(a=t(self.webkitPostMessage,self.postMessage)),s.canTransferArrayBuffer||(i.length=0);try{a(o,i)}catch(t){o.result=void 0,o.error="postMessage failed with error: "+n(t)+"\n  with responseMessage: "+JSON.stringify(o),a(o)}}}return r}),define("Workers/createVectorTilePoints",["../Core/AttributeCompression","../Core/Cartesian3","../Core/Cartographic","../Core/Ellipsoid","../Core/Math","../Core/Rectangle","./createTaskProcessorWorker"],function(t,e,n,r,a,i,o){"use strict";function u(t){t=new Float64Array(t);var e=0;m.min=t[e++],m.max=t[e++],i.unpack(t,e,d),e+=i.packedLength,r.unpack(t,e,l)}function s(r,i){var o=new Uint16Array(r.positions);u(r.packedBuffer);var s=d,y=l,p=m.min,g=m.max,v=o.length/3,w=o.subarray(0,v),x=o.subarray(v,2*v),M=o.subarray(2*v,3*v);t.zigZagDeltaDecode(w,x,M);for(var _=new Float64Array(o.length),E=0;E<v;++E){var O=w[E],S=x[E],P=M[E],R=a.lerp(s.west,s.east,O/c),I=a.lerp(s.south,s.north,S/c),T=a.lerp(p,g,P/c),b=n.fromRadians(R,I,T,h),A=y.cartographicToCartesian(b,f);e.pack(A,_,3*E)}return i.push(_.buffer),{positions:_.buffer}}var c=32767,h=new n,f=new e,d=new i,l=new r,m={min:void 0,max:void 0};return o(s)})}();