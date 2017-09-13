/* Phaser v2.6.2 P2.JS Build - http://phaser.io - @photonstorm - (c) 2016 Photon Storm Ltd. */

!function(a){if("object"==typeof exports)module.exports=a();else if("function"==typeof define,1){var b;"undefined"!=typeof window?b=window:"undefined"!=typeof global?b=global:"undefined"!=typeof self&&(b=self),b.p2=a()}else define(a)}(function(){return function a(b,c,d){function e(g,h){if(!c[g]){if(!b[g]){var i="function"==typeof require&&require;if(!h&&i)return i(g,!0);if(f)return f(g,!0);throw new Error("Cannot find module '"+g+"'")}var j=c[g]={exports:{}};b[g][0].call(j.exports,function(a){var c=b[g][1][a];return e(c?c:a)},j,j.exports,a,b,c,d)}return c[g].exports}for(var f="function"==typeof require&&require,g=0;g<d.length;g++)e(d[g]);return e}({1:[function(a,b,c){function d(){}var e=a("./Scalar");b.exports=d,d.lineInt=function(a,b,c){c=c||0;var d,f,g,h,i,j,k,l=[0,0];return d=a[1][1]-a[0][1],f=a[0][0]-a[1][0],g=d*a[0][0]+f*a[0][1],h=b[1][1]-b[0][1],i=b[0][0]-b[1][0],j=h*b[0][0]+i*b[0][1],k=d*i-h*f,e.eq(k,0,c)||(l[0]=(i*g-f*j)/k,l[1]=(d*j-h*g)/k),l},d.segmentsIntersect=function(a,b,c,d){var e=b[0]-a[0],f=b[1]-a[1],g=d[0]-c[0],h=d[1]-c[1];if(g*f-h*e==0)return!1;var i=(e*(c[1]-a[1])+f*(a[0]-c[0]))/(g*f-h*e),j=(g*(a[1]-c[1])+h*(c[0]-a[0]))/(h*e-g*f);return i>=0&&i<=1&&j>=0&&j<=1}},{"./Scalar":4}],2:[function(a,b,c){function d(){}b.exports=d,d.area=function(a,b,c){return(b[0]-a[0])*(c[1]-a[1])-(c[0]-a[0])*(b[1]-a[1])},d.left=function(a,b,c){return d.area(a,b,c)>0},d.leftOn=function(a,b,c){return d.area(a,b,c)>=0},d.right=function(a,b,c){return d.area(a,b,c)<0},d.rightOn=function(a,b,c){return d.area(a,b,c)<=0};var e=[],f=[];d.collinear=function(a,b,c,g){if(g){var h=e,i=f;h[0]=b[0]-a[0],h[1]=b[1]-a[1],i[0]=c[0]-b[0],i[1]=c[1]-b[1];var j=h[0]*i[0]+h[1]*i[1],k=Math.sqrt(h[0]*h[0]+h[1]*h[1]),l=Math.sqrt(i[0]*i[0]+i[1]*i[1]),m=Math.acos(j/(k*l));return m<g}return 0==d.area(a,b,c)},d.sqdist=function(a,b){var c=b[0]-a[0],d=b[1]-a[1];return c*c+d*d}},{}],3:[function(a,b,c){function d(){this.vertices=[]}function e(a,b,c,d,e){e=e||0;var f=b[1]-a[1],g=a[0]-b[0],i=f*a[0]+g*a[1],j=d[1]-c[1],k=c[0]-d[0],l=j*c[0]+k*c[1],m=f*k-j*g;return h.eq(m,0,e)?[0,0]:[(k*i-g*l)/m,(f*l-j*i)/m]}var f=a("./Line"),g=a("./Point"),h=a("./Scalar");b.exports=d,d.prototype.at=function(a){var b=this.vertices,c=b.length;return b[a<0?a%c+c:a%c]},d.prototype.first=function(){return this.vertices[0]},d.prototype.last=function(){return this.vertices[this.vertices.length-1]},d.prototype.clear=function(){this.vertices.length=0},d.prototype.append=function(a,b,c){if("undefined"==typeof b)throw new Error("From is not given!");if("undefined"==typeof c)throw new Error("To is not given!");if(c-1<b)throw new Error("lol1");if(c>a.vertices.length)throw new Error("lol2");if(b<0)throw new Error("lol3");for(var d=b;d<c;d++)this.vertices.push(a.vertices[d])},d.prototype.makeCCW=function(){for(var a=0,b=this.vertices,c=1;c<this.vertices.length;++c)(b[c][1]<b[a][1]||b[c][1]==b[a][1]&&b[c][0]>b[a][0])&&(a=c);g.left(this.at(a-1),this.at(a),this.at(a+1))||this.reverse()},d.prototype.reverse=function(){for(var a=[],b=0,c=this.vertices.length;b!==c;b++)a.push(this.vertices.pop());this.vertices=a},d.prototype.isReflex=function(a){return g.right(this.at(a-1),this.at(a),this.at(a+1))};var i=[],j=[];d.prototype.canSee=function(a,b){var c,d,e=i,h=j;if(g.leftOn(this.at(a+1),this.at(a),this.at(b))&&g.rightOn(this.at(a-1),this.at(a),this.at(b)))return!1;d=g.sqdist(this.at(a),this.at(b));for(var k=0;k!==this.vertices.length;++k)if((k+1)%this.vertices.length!==a&&k!==a&&g.leftOn(this.at(a),this.at(b),this.at(k+1))&&g.rightOn(this.at(a),this.at(b),this.at(k))&&(e[0]=this.at(a),e[1]=this.at(b),h[0]=this.at(k),h[1]=this.at(k+1),c=f.lineInt(e,h),g.sqdist(this.at(a),c)<d))return!1;return!0},d.prototype.copy=function(a,b,c){var e=c||new d;if(e.clear(),a<b)for(var f=a;f<=b;f++)e.vertices.push(this.vertices[f]);else{for(var f=0;f<=b;f++)e.vertices.push(this.vertices[f]);for(var f=a;f<this.vertices.length;f++)e.vertices.push(this.vertices[f])}return e},d.prototype.getCutEdges=function(){for(var a=[],b=[],c=[],e=new d,f=Number.MAX_VALUE,g=0;g<this.vertices.length;++g)if(this.isReflex(g))for(var h=0;h<this.vertices.length;++h)if(this.canSee(g,h)){b=this.copy(g,h,e).getCutEdges(),c=this.copy(h,g,e).getCutEdges();for(var i=0;i<c.length;i++)b.push(c[i]);b.length<f&&(a=b,f=b.length,a.push([this.at(g),this.at(h)]))}return a},d.prototype.decomp=function(){var a=this.getCutEdges();return a.length>0?this.slice(a):[this]},d.prototype.slice=function(a){if(0==a.length)return[this];if(a instanceof Array&&a.length&&a[0]instanceof Array&&2==a[0].length&&a[0][0]instanceof Array){for(var b=[this],c=0;c<a.length;c++)for(var d=a[c],e=0;e<b.length;e++){var f=b[e],g=f.slice(d);if(g){b.splice(e,1),b.push(g[0],g[1]);break}}return b}var d=a,c=this.vertices.indexOf(d[0]),e=this.vertices.indexOf(d[1]);return c!=-1&&e!=-1&&[this.copy(c,e),this.copy(e,c)]},d.prototype.isSimple=function(){for(var a=this.vertices,b=0;b<a.length-1;b++)for(var c=0;c<b-1;c++)if(f.segmentsIntersect(a[b],a[b+1],a[c],a[c+1]))return!1;for(var b=1;b<a.length-2;b++)if(f.segmentsIntersect(a[0],a[a.length-1],a[b],a[b+1]))return!1;return!0},d.prototype.quickDecomp=function(a,b,c,f,h,i){h=h||100,i=i||0,f=f||25,a="undefined"!=typeof a?a:[],b=b||[],c=c||[];var j=[0,0],k=[0,0],l=[0,0],m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=new d,u=new d,v=this,w=this.vertices;if(w.length<3)return a;if(i++,i>h)return console.warn("quickDecomp: max level ("+h+") reached."),a;for(var x=0;x<this.vertices.length;++x)if(v.isReflex(x)){b.push(v.vertices[x]),m=n=Number.MAX_VALUE;for(var y=0;y<this.vertices.length;++y)g.left(v.at(x-1),v.at(x),v.at(y))&&g.rightOn(v.at(x-1),v.at(x),v.at(y-1))&&(l=e(v.at(x-1),v.at(x),v.at(y),v.at(y-1)),g.right(v.at(x+1),v.at(x),l)&&(o=g.sqdist(v.vertices[x],l),o<n&&(n=o,k=l,r=y))),g.left(v.at(x+1),v.at(x),v.at(y+1))&&g.rightOn(v.at(x+1),v.at(x),v.at(y))&&(l=e(v.at(x+1),v.at(x),v.at(y),v.at(y+1)),g.left(v.at(x-1),v.at(x),l)&&(o=g.sqdist(v.vertices[x],l),o<m&&(m=o,j=l,q=y)));if(r==(q+1)%this.vertices.length)l[0]=(k[0]+j[0])/2,l[1]=(k[1]+j[1])/2,c.push(l),x<q?(t.append(v,x,q+1),t.vertices.push(l),u.vertices.push(l),0!=r&&u.append(v,r,v.vertices.length),u.append(v,0,x+1)):(0!=x&&t.append(v,x,v.vertices.length),t.append(v,0,q+1),t.vertices.push(l),u.vertices.push(l),u.append(v,r,x+1));else{if(r>q&&(q+=this.vertices.length),p=Number.MAX_VALUE,q<r)return a;for(var y=r;y<=q;++y)g.leftOn(v.at(x-1),v.at(x),v.at(y))&&g.rightOn(v.at(x+1),v.at(x),v.at(y))&&(o=g.sqdist(v.at(x),v.at(y)),o<p&&(p=o,s=y%this.vertices.length));x<s?(t.append(v,x,s+1),0!=s&&u.append(v,s,w.length),u.append(v,0,x+1)):(0!=x&&t.append(v,x,w.length),t.append(v,0,s+1),u.append(v,s,x+1))}return t.vertices.length<u.vertices.length?(t.quickDecomp(a,b,c,f,h,i),u.quickDecomp(a,b,c,f,h,i)):(u.quickDecomp(a,b,c,f,h,i),t.quickDecomp(a,b,c,f,h,i)),a}return a.push(this),a},d.prototype.removeCollinearPoints=function(a){for(var b=0,c=this.vertices.length-1;this.vertices.length>3&&c>=0;--c)g.collinear(this.at(c-1),this.at(c),this.at(c+1),a)&&(this.vertices.splice(c%this.vertices.length,1),c--,b++);return b}},{"./Line":1,"./Point":2,"./Scalar":4}],4:[function(a,b,c){function d(){}b.exports=d,d.eq=function(a,b,c){return c=c||0,Math.abs(a-b)<c}},{}],5:[function(a,b,c){b.exports={Polygon:a("./Polygon"),Point:a("./Point")}},{"./Point":2,"./Polygon":3}],6:[function(a,b,c){b.exports={name:"p2",version:"0.7.0",description:"A JavaScript 2D physics engine.",author:"Stefan Hedman <schteppe@gmail.com> (http://steffe.se)",keywords:["p2.js","p2","physics","engine","2d"],main:"./src/p2.js",engines:{node:"*"},repository:{type:"git",url:"https://github.com/schteppe/p2.js.git"},bugs:{url:"https://github.com/schteppe/p2.js/issues"},licenses:[{type:"MIT"}],devDependencies:{grunt:"^0.4.5","grunt-contrib-jshint":"^0.11.2","grunt-contrib-nodeunit":"^0.4.1","grunt-contrib-uglify":"~0.4.0","grunt-contrib-watch":"~0.5.0","grunt-browserify":"~2.0.1","grunt-contrib-concat":"^0.4.0"},dependencies:{"poly-decomp":"0.1.0"}}},{}],7:[function(a,b,c){function d(a){this.lowerBound=e.create(),a&&a.lowerBound&&e.copy(this.lowerBound,a.lowerBound),this.upperBound=e.create(),a&&a.upperBound&&e.copy(this.upperBound,a.upperBound)}var e=a("../math/vec2");a("../utils/Utils");b.exports=d;var f=e.create();d.prototype.setFromPoints=function(a,b,c,d){var g=this.lowerBound,h=this.upperBound;"number"!=typeof c&&(c=0),0!==c?e.rotate(g,a[0],c):e.copy(g,a[0]),e.copy(h,g);for(var i=Math.cos(c),j=Math.sin(c),k=1;k<a.length;k++){var l=a[k];if(0!==c){var m=l[0],n=l[1];f[0]=i*m-j*n,f[1]=j*m+i*n,l=f}for(var o=0;o<2;o++)l[o]>h[o]&&(h[o]=l[o]),l[o]<g[o]&&(g[o]=l[o])}b&&(e.add(this.lowerBound,this.lowerBound,b),e.add(this.upperBound,this.upperBound,b)),d&&(this.lowerBound[0]-=d,this.lowerBound[1]-=d,this.upperBound[0]+=d,this.upperBound[1]+=d)},d.prototype.copy=function(a){e.copy(this.lowerBound,a.lowerBound),e.copy(this.upperBound,a.upperBound)},d.prototype.extend=function(a){for(var b=2;b--;){var c=a.lowerBound[b];this.lowerBound[b]>c&&(this.lowerBound[b]=c);var d=a.upperBound[b];this.upperBound[b]<d&&(this.upperBound[b]=d)}},d.prototype.overlaps=function(a){var b=this.lowerBound,c=this.upperBound,d=a.lowerBound,e=a.upperBound;return(d[0]<=c[0]&&c[0]<=e[0]||b[0]<=e[0]&&e[0]<=c[0])&&(d[1]<=c[1]&&c[1]<=e[1]||b[1]<=e[1]&&e[1]<=c[1])},d.prototype.containsPoint=function(a){var b=this.lowerBound,c=this.upperBound;return b[0]<=a[0]&&a[0]<=c[0]&&b[1]<=a[1]&&a[1]<=c[1]},d.prototype.overlapsRay=function(a){var b=1/a.direction[0],c=1/a.direction[1],d=(this.lowerBound[0]-a.from[0])*b,e=(this.upperBound[0]-a.from[0])*b,f=(this.lowerBound[1]-a.from[1])*c,g=(this.upperBound[1]-a.from[1])*c,h=Math.max(Math.max(Math.min(d,e),Math.min(f,g))),i=Math.min(Math.min(Math.max(d,e),Math.max(f,g)));return i<0?-1:h>i?-1:h}},{"../math/vec2":30,"../utils/Utils":57}],8:[function(a,b,c){function d(a){this.type=a,this.result=[],this.world=null,this.boundingVolumeType=d.AABB}var e=a("../math/vec2"),f=a("../objects/Body");b.exports=d,d.AABB=1,d.BOUNDING_CIRCLE=2,d.prototype.setWorld=function(a){this.world=a},d.prototype.getCollisionPairs=function(a){};var g=e.create();d.boundingRadiusCheck=function(a,b){e.sub(g,a.position,b.position);var c=e.squaredLength(g),d=a.boundingRadius+b.boundingRadius;return c<=d*d},d.aabbCheck=function(a,b){return a.getAABB().overlaps(b.getAABB())},d.prototype.boundingVolumeCheck=function(a,b){var c;switch(this.boundingVolumeType){case d.BOUNDING_CIRCLE:c=d.boundingRadiusCheck(a,b);break;case d.AABB:c=d.aabbCheck(a,b);break;default:throw new Error("Bounding volume type not recognized: "+this.boundingVolumeType)}return c},d.canCollide=function(a,b){var c=f.KINEMATIC,d=f.STATIC;return(a.type!==d||b.type!==d)&&(!(a.type===c&&b.type===d||a.type===d&&b.type===c)&&((a.type!==c||b.type!==c)&&((a.sleepState!==f.SLEEPING||b.sleepState!==f.SLEEPING)&&!(a.sleepState===f.SLEEPING&&b.type===d||b.sleepState===f.SLEEPING&&a.type===d))))},d.NAIVE=1,d.SAP=2},{"../math/vec2":30,"../objects/Body":31}],9:[function(a,b,c){function d(){e.call(this,e.NAIVE)}var e=(a("../shapes/Circle"),a("../shapes/Plane"),a("../shapes/Shape"),a("../shapes/Particle"),a("../collision/Broadphase"));a("../math/vec2");b.exports=d,d.prototype=new e,d.prototype.constructor=d,d.prototype.getCollisionPairs=function(a){var b=a.bodies,c=this.result;c.length=0;for(var d=0,f=b.length;d!==f;d++)for(var g=b[d],h=0;h<d;h++){var i=b[h];e.canCollide(g,i)&&this.boundingVolumeCheck(g,i)&&c.push(g,i)}return c},d.prototype.aabbQuery=function(a,b,c){c=c||[];for(var d=a.bodies,e=0;e<d.length;e++){var f=d[e];f.aabbNeedsUpdate&&f.updateAABB(),f.aabb.overlaps(b)&&c.push(f)}return c}},{"../collision/Broadphase":8,"../math/vec2":30,"../shapes/Circle":39,"../shapes/Particle":43,"../shapes/Plane":44,"../shapes/Shape":45}],10:[function(a,b,c){function d(){this.contactEquations=[],this.frictionEquations=[],this.enableFriction=!0,this.enabledEquations=!0,this.slipForce=10,this.frictionCoefficient=.3,this.surfaceVelocity=0,this.contactEquationPool=new k({size:32}),this.frictionEquationPool=new l({size:64}),this.restitution=0,this.stiffness=n.DEFAULT_STIFFNESS,this.relaxation=n.DEFAULT_RELAXATION,this.frictionStiffness=n.DEFAULT_STIFFNESS,this.frictionRelaxation=n.DEFAULT_RELAXATION,this.enableFrictionReduction=!0,this.collidingBodiesLastStep=new m,this.contactSkinSize=.01}function e(a,b){g.set(a.vertices[0],.5*-b.length,-b.radius),g.set(a.vertices[1],.5*b.length,-b.radius),g.set(a.vertices[2],.5*b.length,b.radius),g.set(a.vertices[3],.5*-b.length,b.radius)}function f(a,b,c,d){for(var e=T,f=U,j=V,k=W,l=a,m=b.vertices,n=null,o=0;o!==m.length+1;o++){var p=m[o%m.length],q=m[(o+1)%m.length];g.rotate(e,p,d),g.rotate(f,q,d),i(e,e,c),i(f,f,c),h(j,e,l),h(k,f,l);var r=g.crossLength(j,k);if(null===n&&(n=r),r*n<=0)return!1;n=r}return!0}var g=a("../math/vec2"),h=g.sub,i=g.add,j=g.dot,k=(a("../utils/Utils"),a("../utils/ContactEquationPool")),l=a("../utils/FrictionEquationPool"),m=a("../utils/TupleDictionary"),n=a("../equations/Equation"),o=(a("../equations/ContactEquation"),a("../equations/FrictionEquation"),a("../shapes/Circle")),p=a("../shapes/Convex"),q=a("../shapes/Shape"),r=(a("../objects/Body"),a("../shapes/Box"));b.exports=d;var s=g.fromValues(0,1),t=g.fromValues(0,0),u=g.fromValues(0,0),v=g.fromValues(0,0),w=g.fromValues(0,0),x=g.fromValues(0,0),y=g.fromValues(0,0),z=g.fromValues(0,0),A=g.fromValues(0,0),B=g.fromValues(0,0),C=g.fromValues(0,0),D=g.fromValues(0,0),E=g.fromValues(0,0),F=g.fromValues(0,0),G=g.fromValues(0,0),H=g.fromValues(0,0),I=g.fromValues(0,0),J=g.fromValues(0,0),K=g.fromValues(0,0),L=[],M=g.create(),N=g.create();d.prototype.bodiesOverlap=function(a,b){for(var c=M,d=N,e=0,f=a.shapes.length;e!==f;e++){var g=a.shapes[e];a.toWorldFrame(c,g.position);for(var h=0,i=b.shapes.length;h!==i;h++){var j=b.shapes[h];if(b.toWorldFrame(d,j.position),this[g.type|j.type](a,g,c,g.angle+a.angle,b,j,d,j.angle+b.angle,!0))return!0}}return!1},d.prototype.collidedLastStep=function(a,b){var c=0|a.id,d=0|b.id;return!!this.collidingBodiesLastStep.get(c,d)},d.prototype.reset=function(){this.collidingBodiesLastStep.reset();for(var a=this.contactEquations,b=a.length;b--;){var c=a[b],d=c.bodyA.id,e=c.bodyB.id;this.collidingBodiesLastStep.set(d,e,!0)}for(var f=this.contactEquations,g=this.frictionEquations,h=0;h<f.length;h++)this.contactEquationPool.release(f[h]);for(var h=0;h<g.length;h++)this.frictionEquationPool.release(g[h]);this.contactEquations.length=this.frictionEquations.length=0},d.prototype.createContactEquation=function(a,b,c,d){var e=this.contactEquationPool.get();return e.bodyA=a,e.bodyB=b,e.shapeA=c,e.shapeB=d,e.restitution=this.restitution,e.firstImpact=!this.collidedLastStep(a,b),e.stiffness=this.stiffness,e.relaxation=this.relaxation,e.needsUpdate=!0,e.enabled=this.enabledEquations,e.offset=this.contactSkinSize,e},d.prototype.createFrictionEquation=function(a,b,c,d){var e=this.frictionEquationPool.get();return e.bodyA=a,e.bodyB=b,e.shapeA=c,e.shapeB=d,e.setSlipForce(this.slipForce),e.frictionCoefficient=this.frictionCoefficient,e.relativeVelocity=this.surfaceVelocity,e.enabled=this.enabledEquations,e.needsUpdate=!0,e.stiffness=this.frictionStiffness,e.relaxation=this.frictionRelaxation,e.contactEquations.length=0,e},d.prototype.createFrictionFromContact=function(a){var b=this.createFrictionEquation(a.bodyA,a.bodyB,a.shapeA,a.shapeB);return g.copy(b.contactPointA,a.contactPointA),g.copy(b.contactPointB,a.contactPointB),g.rotate90cw(b.t,a.normalA),b.contactEquations.push(a),b},d.prototype.createFrictionFromAverage=function(a){var b=this.contactEquations[this.contactEquations.length-1],c=this.createFrictionEquation(b.bodyA,b.bodyB,b.shapeA,b.shapeB),d=b.bodyA;b.bodyB;g.set(c.contactPointA,0,0),g.set(c.contactPointB,0,0),g.set(c.t,0,0);for(var e=0;e!==a;e++)b=this.contactEquations[this.contactEquations.length-1-e],b.bodyA===d?(g.add(c.t,c.t,b.normalA),g.add(c.contactPointA,c.contactPointA,b.contactPointA),g.add(c.contactPointB,c.contactPointB,b.contactPointB)):(g.sub(c.t,c.t,b.normalA),g.add(c.contactPointA,c.contactPointA,b.contactPointB),g.add(c.contactPointB,c.contactPointB,b.contactPointA)),c.contactEquations.push(b);var f=1/a;return g.scale(c.contactPointA,c.contactPointA,f),g.scale(c.contactPointB,c.contactPointB,f),g.normalize(c.t,c.t),g.rotate90cw(c.t,c.t),c},d.prototype[q.LINE|q.CONVEX]=d.prototype.convexLine=function(a,b,c,d,e,f,g,h,i){return!i&&0},d.prototype[q.LINE|q.BOX]=d.prototype.lineBox=function(a,b,c,d,e,f,g,h,i){return!i&&0};var O=new r({width:1,height:1}),P=g.create();d.prototype[q.CAPSULE|q.CONVEX]=d.prototype[q.CAPSULE|q.BOX]=d.prototype.convexCapsule=function(a,b,c,d,f,h,i,j,k){var l=P;g.set(l,h.length/2,0),g.rotate(l,l,j),g.add(l,l,i);var m=this.circleConvex(f,h,l,j,a,b,c,d,k,h.radius);g.set(l,-h.length/2,0),g.rotate(l,l,j),g.add(l,l,i);var n=this.circleConvex(f,h,l,j,a,b,c,d,k,h.radius);if(k&&(m||n))return!0;var o=O;e(o,h);var p=this.convexConvex(a,b,c,d,f,o,i,j,k);return p+m+n},d.prototype[q.CAPSULE|q.LINE]=d.prototype.lineCapsule=function(a,b,c,d,e,f,g,h,i){return!i&&0};var Q=g.create(),R=g.create(),S=new r({width:1,height:1});d.prototype[q.CAPSULE|q.CAPSULE]=d.prototype.capsuleCapsule=function(a,b,c,d,f,h,i,j,k){for(var l,m=Q,n=R,o=0,p=0;p<2;p++){g.set(m,(0===p?-1:1)*b.length/2,0),g.rotate(m,m,d),g.add(m,m,c);for(var q=0;q<2;q++){g.set(n,(0===q?-1:1)*h.length/2,0),g.rotate(n,n,j),g.add(n,n,i),this.enableFrictionReduction&&(l=this.enableFriction,this.enableFriction=!1);var r=this.circleCircle(a,b,m,d,f,h,n,j,k,b.radius,h.radius);if(this.enableFrictionReduction&&(this.enableFriction=l),k&&r)return!0;o+=r}}this.enableFrictionReduction&&(l=this.enableFriction,this.enableFriction=!1);var s=S;e(s,b);var t=this.convexCapsule(a,s,c,d,f,h,i,j,k);if(this.enableFrictionReduction&&(this.enableFriction=l),k&&t)return!0;if(o+=t,this.enableFrictionReduction){var l=this.enableFriction;this.enableFriction=!1}e(s,h);var u=this.convexCapsule(f,s,i,j,a,b,c,d,k);return this.enableFrictionReduction&&(this.enableFriction=l),!(!k||!u)||(o+=u,this.enableFrictionReduction&&o&&this.enableFriction&&this.frictionEquations.push(this.createFrictionFromAverage(o)),o)},d.prototype[q.LINE|q.LINE]=d.prototype.lineLine=function(a,b,c,d,e,f,g,h,i){return!i&&0},d.prototype[q.PLANE|q.LINE]=d.prototype.planeLine=function(a,b,c,d,e,f,k,l,m){var n=t,o=u,p=v,q=w,r=x,C=y,D=z,E=A,F=B,G=L,H=0;g.set(n,-f.length/2,0),g.set(o,f.length/2,0),g.rotate(p,n,l),g.rotate(q,o,l),i(p,p,k),i(q,q,k),g.copy(n,p),g.copy(o,q),h(r,o,n),g.normalize(C,r),g.rotate90cw(F,C),g.rotate(E,s,d),G[0]=n,G[1]=o;for(var I=0;I<G.length;I++){var J=G[I];h(D,J,c);var K=j(D,E);if(K<0){if(m)return!0;var M=this.createContactEquation(a,e,b,f);H++,g.copy(M.normalA,E),g.normalize(M.normalA,M.normalA),g.scale(D,E,K),h(M.contactPointA,J,D),h(M.contactPointA,M.contactPointA,a.position),h(M.contactPointB,J,k),i(M.contactPointB,M.contactPointB,k),h(M.contactPointB,M.contactPointB,e.position),this.contactEquations.push(M),this.enableFrictionReduction||this.enableFriction&&this.frictionEquations.push(this.createFrictionFromContact(M))}}return!m&&(this.enableFrictionReduction||H&&this.enableFriction&&this.frictionEquations.push(this.createFrictionFromAverage(H)),H)},d.prototype[q.PARTICLE|q.CAPSULE]=d.prototype.particleCapsule=function(a,b,c,d,e,f,g,h,i){return this.circleLine(a,b,c,d,e,f,g,h,i,f.radius,0)},d.prototype[q.CIRCLE|q.LINE]=d.prototype.circleLine=function(a,b,c,d,e,f,k,l,m,n,o){var n=n||0,o="undefined"!=typeof o?o:b.radius,p=t,q=u,r=v,s=w,H=x,I=y,J=z,K=A,M=B,N=C,O=D,P=E,Q=F,R=G,S=L;g.set(K,-f.length/2,0),g.set(M,f.length/2,0),g.rotate(N,K,l),g.rotate(O,M,l),i(N,N,k),i(O,O,k),g.copy(K,N),g.copy(M,O),h(I,M,K),g.normalize(J,I),g.rotate90cw(H,J),h(P,c,K);var T=j(P,H);h(s,K,k),h(Q,c,k);var U=o+n;if(Math.abs(T)<U){g.scale(p,H,T),h(r,c,p),g.scale(q,H,j(H,Q)),g.normalize(q,q),g.scale(q,q,n),i(r,r,q);var V=j(J,r),W=j(J,K),X=j(J,M);if(V>W&&V<X){if(m)return!0;var Y=this.createContactEquation(a,e,b,f);return g.scale(Y.normalA,p,-1),g.normalize(Y.normalA,Y.normalA),g.scale(Y.contactPointA,Y.normalA,o),i(Y.contactPointA,Y.contactPointA,c),h(Y.contactPointA,Y.contactPointA,a.position),h(Y.contactPointB,r,k),i(Y.contactPointB,Y.contactPointB,k),h(Y.contactPointB,Y.contactPointB,e.position),this.contactEquations.push(Y),this.enableFriction&&this.frictionEquations.push(this.createFrictionFromContact(Y)),1}}S[0]=K,S[1]=M;for(var Z=0;Z<S.length;Z++){var $=S[Z];if(h(P,$,c),g.squaredLength(P)<Math.pow(U,2)){if(m)return!0;var Y=this.createContactEquation(a,e,b,f);return g.copy(Y.normalA,P),g.normalize(Y.normalA,Y.normalA),g.scale(Y.contactPointA,Y.normalA,o),i(Y.contactPointA,Y.contactPointA,c),h(Y.contactPointA,Y.contactPointA,a.position),h(Y.contactPointB,$,k),g.scale(R,Y.normalA,-n),i(Y.contactPointB,Y.contactPointB,R),i(Y.contactPointB,Y.contactPointB,k),h(Y.contactPointB,Y.contactPointB,e.position),this.contactEquations.push(Y),this.enableFriction&&this.frictionEquations.push(this.createFrictionFromContact(Y)),1}}return 0},d.prototype[q.CIRCLE|q.CAPSULE]=d.prototype.circleCapsule=function(a,b,c,d,e,f,g,h,i){return this.circleLine(a,b,c,d,e,f,g,h,i,f.radius)},d.prototype[q.CIRCLE|q.CONVEX]=d.prototype[q.CIRCLE|q.BOX]=d.prototype.circleConvex=function(a,b,c,d,e,j,k,l,m,n){for(var n="number"==typeof n?n:b.radius,o=t,p=u,q=v,r=w,s=x,y=C,z=D,A=F,B=G,E=H,J=I,K=!1,L=Number.MAX_VALUE,M=j.vertices,N=0;N!==M.length+1;N++){var O=M[N%M.length],P=M[(N+1)%M.length];if(g.rotate(o,O,l),g.rotate(p,P,l),i(o,o,k),i(p,p,k),h(q,p,o),g.normalize(r,q),g.rotate90cw(s,r),g.scale(B,s,-b.radius),i(B,B,c),f(B,j,k,l)){g.sub(E,o,B);var Q=Math.abs(g.dot(E,s));Q<L&&(g.copy(J,B),L=Q,g.scale(A,s,Q),g.add(A,A,B),K=!0)}}if(K){if(m)return!0;var R=this.createContactEquation(a,e,b,j);return g.sub(R.normalA,J,c),g.normalize(R.normalA,R.normalA),g.scale(R.contactPointA,R.normalA,n),i(R.contactPointA,R.contactPointA,c),h(R.contactPointA,R.contactPointA,a.position),h(R.contactPointB,A,k),i(R.contactPointB,R.contactPointB,k),h(R.contactPointB,R.contactPointB,e.position),this.contactEquations.push(R),this.enableFriction&&this.frictionEquations.push(this.createFrictionFromContact(R)),1}if(n>0)for(var N=0;N<M.length;N++){var S=M[N];if(g.rotate(z,S,l),i(z,z,k),h(y,z,c),g.squaredLength(y)<Math.pow(n,2)){if(m)return!0;var R=this.createContactEquation(a,e,b,j);return g.copy(R.normalA,y),g.normalize(R.normalA,R.normalA),g.scale(R.contactPointA,R.normalA,n),i(R.contactPointA,R.contactPointA,c),h(R.contactPointA,R.contactPointA,a.position),h(R.contactPointB,z,k),i(R.contactPointB,R.contactPointB,k),h(R.contactPointB,R.contactPointB,e.position),this.contactEquations.push(R),this.enableFriction&&this.frictionEquations.push(this.createFrictionFromContact(R)),1}}return 0};var T=g.create(),U=g.create(),V=g.create(),W=g.create();d.prototype[q.PARTICLE|q.CONVEX]=d.prototype[q.PARTICLE|q.BOX]=d.prototype.particleConvex=function(a,b,c,d,e,k,l,m,n){var o=t,p=u,q=v,r=w,s=x,A=y,B=z,D=C,E=F,G=J,H=K,I=Number.MAX_VALUE,L=!1,M=k.vertices;if(!f(c,k,l,m))return 0;if(n)return!0;for(var N=0;N!==M.length+1;N++){var O=M[N%M.length],P=M[(N+1)%M.length];g.rotate(o,O,m),g.rotate(p,P,m),i(o,o,l),i(p,p,l),h(q,p,o),g.normalize(r,q),g.rotate90cw(s,r),h(D,c,o);j(D,s);h(A,o,l),h(B,c,l),g.sub(G,o,c);var Q=Math.abs(g.dot(G,s));Q<I&&(I=Q,g.scale(E,s,Q),g.add(E,E,c),g.copy(H,s),L=!0)}if(L){var R=this.createContactEquation(a,e,b,k);return g.scale(R.normalA,H,-1),g.normalize(R.normalA,R.normalA),g.set(R.contactPointA,0,0),i(R.contactPointA,R.contactPointA,c),h(R.contactPointA,R.contactPointA,a.position),h(R.contactPointB,E,l),i(R.contactPointB,R.contactPointB,l),h(R.contactPointB,R.contactPointB,e.position),this.contactEquations.push(R),this.enableFriction&&this.frictionEquations.push(this.createFrictionFromContact(R)),1}return 0},d.prototype[q.CIRCLE]=d.prototype.circleCircle=function(a,b,c,d,e,f,j,k,l,m,n){var o=t,m=m||b.radius,n=n||f.radius;h(o,c,j);var p=m+n;if(g.squaredLength(o)>Math.pow(p,2))return 0;if(l)return!0;var q=this.createContactEquation(a,e,b,f);return h(q.normalA,j,c),g.normalize(q.normalA,q.normalA),g.scale(q.contactPointA,q.normalA,m),g.scale(q.contactPointB,q.normalA,-n),i(q.contactPointA,q.contactPointA,c),h(q.contactPointA,q.contactPointA,a.position),i(q.contactPointB,q.contactPointB,j),h(q.contactPointB,q.contactPointB,e.position),this.contactEquations.push(q),this.enableFriction&&this.frictionEquations.push(this.createFrictionFromContact(q)),1},d.prototype[q.PLANE|q.CONVEX]=d.prototype[q.PLANE|q.BOX]=d.prototype.planeConvex=function(a,b,c,d,e,f,k,l,m){var n=t,o=u,p=v,q=0;g.rotate(o,s,d);for(var r=0;r!==f.vertices.length;r++){var w=f.vertices[r];if(g.rotate(n,w,l),i(n,n,k),h(p,n,c),j(p,o)<=0){if(m)return!0;q++;var x=this.createContactEquation(a,e,b,f);h(p,n,c),g.copy(x.normalA,o);var y=j(p,x.normalA);g.scale(p,x.normalA,y),h(x.contactPointB,n,e.position),h(x.contactPointA,n,p),h(x.contactPointA,x.contactPointA,a.position),this.contactEquations.push(x),this.enableFrictionReduction||this.enableFriction&&this.frictionEquations.push(this.createFrictionFromContact(x))}}return this.enableFrictionReduction&&this.enableFriction&&q&&this.frictionEquations.push(this.createFrictionFromAverage(q)),q},d.prototype[q.PARTICLE|q.PLANE]=d.prototype.particlePlane=function(a,b,c,d,e,f,i,k,l){var m=t,n=u;k=k||0,h(m,c,i),g.rotate(n,s,k);var o=j(m,n);if(o>0)return 0;if(l)return!0;var p=this.createContactEquation(e,a,f,b);return g.copy(p.normalA,n),g.scale(m,p.normalA,o),h(p.contactPointA,c,m),h(p.contactPointA,p.contactPointA,e.position),h(p.contactPointB,c,a.position),this.contactEquations.push(p),this.enableFriction&&this.frictionEquations.push(this.createFrictionFromContact(p)),1},d.prototype[q.CIRCLE|q.PARTICLE]=d.prototype.circleParticle=function(a,b,c,d,e,f,j,k,l){var m=t;if(h(m,j,c),g.squaredLength(m)>Math.pow(b.radius,2))return 0;if(l)return!0;var n=this.createContactEquation(a,e,b,f);return g.copy(n.normalA,m),g.normalize(n.normalA,n.normalA),g.scale(n.contactPointA,n.normalA,b.radius),i(n.contactPointA,n.contactPointA,c),h(n.contactPointA,n.contactPointA,a.position),h(n.contactPointB,j,e.position),this.contactEquations.push(n),this.enableFriction&&this.frictionEquations.push(this.createFrictionFromContact(n)),1};var X=new o({radius:1}),Y=g.create(),Z=g.create();g.create();d.prototype[q.PLANE|q.CAPSULE]=d.prototype.planeCapsule=function(a,b,c,d,e,f,h,j,k){var l=Y,m=Z,n=X;g.set(l,-f.length/2,0),g.rotate(l,l,j),i(l,l,h),g.set(m,f.length/2,0),g.rotate(m,m,j),i(m,m,h),n.radius=f.radius;var o;this.enableFrictionReduction&&(o=this.enableFriction,this.enableFriction=!1);var p=this.circlePlane(e,n,l,0,a,b,c,d,k),q=this.circlePlane(e,n,m,0,a,b,c,d,k);if(this.enableFrictionReduction&&(this.enableFriction=o),k)return p||q;var r=p+q;return this.enableFrictionReduction&&r&&this.frictionEquations.push(this.createFrictionFromAverage(r)),r},d.prototype[q.CIRCLE|q.PLANE]=d.prototype.circlePlane=function(a,b,c,d,e,f,k,l,m){var n=a,o=b,p=c,q=e,r=k,w=l;w=w||0;var x=t,y=u,z=v;h(x,p,r),g.rotate(y,s,w);var A=j(y,x);if(A>o.radius)return 0;if(m)return!0;var B=this.createContactEquation(q,n,f,b);return g.copy(B.normalA,y),g.scale(B.contactPointB,B.normalA,-o.radius),i(B.contactPointB,B.contactPointB,p),h(B.contactPointB,B.contactPointB,n.position),g.scale(z,B.normalA,A),h(B.contactPointA,x,z),i(B.contactPointA,B.contactPointA,r),h(B.contactPointA,B.contactPointA,q.position),this.contactEquations.push(B),this.enableFriction&&this.frictionEquations.push(this.createFrictionFromContact(B)),1},d.prototype[q.CONVEX]=d.prototype[q.CONVEX|q.BOX]=d.prototype[q.BOX]=d.prototype.convexConvex=function(a,b,c,e,f,k,l,m,n,o){var p=t,q=u,r=v,s=w,y=x,C=z,D=A,E=B,F=0,o="number"==typeof o?o:0,G=d.findSeparatingAxis(b,c,e,k,l,m,p);if(!G)return 0;h(D,l,c),j(p,D)>0&&g.scale(p,p,-1);var H=d.getClosestEdge(b,e,p,!0),I=d.getClosestEdge(k,m,p);if(H===-1||I===-1)return 0;for(var J=0;J<2;J++){var K=H,L=I,M=b,N=k,O=c,P=l,Q=e,R=m,S=a,T=f;if(0===J){var U;U=K,K=L,L=U,U=M,M=N,N=U,U=O,O=P,P=U,U=Q,Q=R,R=U,U=S,S=T,T=U}for(var V=L;V<L+2;V++){var W=N.vertices[(V+N.vertices.length)%N.vertices.length];g.rotate(q,W,R),i(q,q,P);for(var X=0,Y=K-1;Y<K+2;Y++){var Z=M.vertices[(Y+M.vertices.length)%M.vertices.length],$=M.vertices[(Y+1+M.vertices.length)%M.vertices.length];g.rotate(r,Z,Q),g.rotate(s,$,Q),i(r,r,O),i(s,s,O),h(y,s,r),g.rotate90cw(E,y),g.normalize(E,E),h(D,q,r);var _=j(E,D);(Y===K&&_<=o||Y!==K&&_<=0)&&X++}if(X>=3){if(n)return!0;var aa=this.createContactEquation(S,T,M,N);F++;var Z=M.vertices[K%M.vertices.length],$=M.vertices[(K+1)%M.vertices.length];g.rotate(r,Z,Q),g.rotate(s,$,Q),i(r,r,O),i(s,s,O),h(y,s,r),g.rotate90cw(aa.normalA,y),g.normalize(aa.normalA,aa.normalA),h(D,q,r);var _=j(aa.normalA,D);g.scale(C,aa.normalA,_),h(aa.contactPointA,q,O),h(aa.contactPointA,aa.contactPointA,C),i(aa.contactPointA,aa.contactPointA,O),h(aa.contactPointA,aa.contactPointA,S.position),h(aa.contactPointB,q,P),i(aa.contactPointB,aa.contactPointB,P),h(aa.contactPointB,aa.contactPointB,T.position),this.contactEquations.push(aa),this.enableFrictionReduction||this.enableFriction&&this.frictionEquations.push(this.createFrictionFromContact(aa))}}}return this.enableFrictionReduction&&this.enableFriction&&F&&this.frictionEquations.push(this.createFrictionFromAverage(F)),F};var $=g.fromValues(0,0);d.projectConvexOntoAxis=function(a,b,c,d,e){var f,h,i=null,k=null,l=$;g.rotate(l,d,-c);for(var m=0;m<a.vertices.length;m++)f=a.vertices[m],h=j(f,l),(null===i||h>i)&&(i=h),(null===k||h<k)&&(k=h);if(k>i){var n=k;k=i,i=n}var o=j(b,d);g.set(e,k+o,i+o)};var _=g.fromValues(0,0),aa=g.fromValues(0,0),ba=g.fromValues(0,0),ca=g.fromValues(0,0),da=g.fromValues(0,0),ea=g.fromValues(0,0);d.findSeparatingAxis=function(a,b,c,e,f,i,j){var k=null,l=!1,m=!1,n=_,o=aa,p=ba,q=ca,s=da,t=ea;if(a instanceof r&&e instanceof r)for(var u=0;2!==u;u++){var v=a,w=c;1===u&&(v=e,w=i);for(var x=0;2!==x;x++){0===x?g.set(q,0,1):1===x&&g.set(q,1,0),0!==w&&g.rotate(q,q,w),d.projectConvexOntoAxis(a,b,c,q,s),d.projectConvexOntoAxis(e,f,i,q,t);var y=s,z=t,A=!1;s[0]>t[0]&&(z=s,y=t,A=!0);var B=z[0]-y[1];l=B<=0,(null===k||B>k)&&(g.copy(j,q),k=B,m=l)}}else for(var u=0;2!==u;u++){var v=a,w=c;1===u&&(v=e,w=i);for(var x=0;x!==v.vertices.length;x++){g.rotate(o,v.vertices[x],w),g.rotate(p,v.vertices[(x+1)%v.vertices.length],w),h(n,p,o),g.rotate90cw(q,n),g.normalize(q,q),d.projectConvexOntoAxis(a,b,c,q,s),d.projectConvexOntoAxis(e,f,i,q,t);var y=s,z=t,A=!1;s[0]>t[0]&&(z=s,y=t,A=!0);var B=z[0]-y[1];l=B<=0,(null===k||B>k)&&(g.copy(j,q),k=B,m=l)}}return m};var fa=g.fromValues(0,0),ga=g.fromValues(0,0),ha=g.fromValues(0,0);d.getClosestEdge=function(a,b,c,d){var e=fa,f=ga,i=ha;g.rotate(e,c,-b),d&&g.scale(e,e,-1);for(var k=-1,l=a.vertices.length,m=-1,n=0;n!==l;n++){h(f,a.vertices[(n+1)%l],a.vertices[n%l]),g.rotate90cw(i,f),g.normalize(i,i);var o=j(i,e);(k===-1||o>m)&&(k=n%l,m=o)}return k};var ia=g.create(),ja=g.create(),ka=g.create(),la=g.create(),ma=g.create(),na=g.create(),oa=g.create();d.prototype[q.CIRCLE|q.HEIGHTFIELD]=d.prototype.circleHeightfield=function(a,b,c,d,e,f,j,k,l,m){var n=f.heights,m=m||b.radius,o=f.elementWidth,p=ja,q=ia,r=ma,s=oa,t=na,u=ka,v=la,w=Math.floor((c[0]-m-j[0])/o),x=Math.ceil((c[0]+m-j[0])/o);w<0&&(w=0),x>=n.length&&(x=n.length-1);for(var y=n[w],z=n[x],A=w;A<x;A++)n[A]<z&&(z=n[A]),n[A]>y&&(y=n[A]);if(c[1]-m>y)return!l&&0;for(var B=!1,A=w;A<x;A++){g.set(u,A*o,n[A]),g.set(v,(A+1)*o,n[A+1]),g.add(u,u,j),g.add(v,v,j),g.sub(t,v,u),g.rotate(t,t,Math.PI/2),g.normalize(t,t),g.scale(q,t,-m),g.add(q,q,c),g.sub(p,q,u);var C=g.dot(p,t);if(q[0]>=u[0]&&q[0]<v[0]&&C<=0){if(l)return!0;B=!0,g.scale(p,t,-C),g.add(r,q,p),g.copy(s,t);var D=this.createContactEquation(e,a,f,b);g.copy(D.normalA,s),g.scale(D.contactPointB,D.normalA,-m),i(D.contactPointB,D.contactPointB,c),h(D.contactPointB,D.contactPointB,a.position),g.copy(D.contactPointA,r),g.sub(D.contactPointA,D.contactPointA,e.position),this.contactEquations.push(D),this.enableFriction&&this.frictionEquations.push(this.createFrictionFromContact(D))}}if(B=!1,m>0)for(var A=w;A<=x;A++)if(g.set(u,A*o,n[A]),g.add(u,u,j),g.sub(p,c,u),g.squaredLength(p)<Math.pow(m,2)){if(l)return!0;
B=!0;var D=this.createContactEquation(e,a,f,b);g.copy(D.normalA,p),g.normalize(D.normalA,D.normalA),g.scale(D.contactPointB,D.normalA,-m),i(D.contactPointB,D.contactPointB,c),h(D.contactPointB,D.contactPointB,a.position),h(D.contactPointA,u,j),i(D.contactPointA,D.contactPointA,j),h(D.contactPointA,D.contactPointA,e.position),this.contactEquations.push(D),this.enableFriction&&this.frictionEquations.push(this.createFrictionFromContact(D))}return B?1:0};var pa=g.create(),qa=g.create(),ra=g.create(),sa=new p({vertices:[g.create(),g.create(),g.create(),g.create()]});d.prototype[q.BOX|q.HEIGHTFIELD]=d.prototype[q.CONVEX|q.HEIGHTFIELD]=d.prototype.convexHeightfield=function(a,b,c,d,e,f,h,i,j){var k=f.heights,l=f.elementWidth,m=pa,n=qa,o=ra,p=sa,q=Math.floor((a.aabb.lowerBound[0]-h[0])/l),r=Math.ceil((a.aabb.upperBound[0]-h[0])/l);q<0&&(q=0),r>=k.length&&(r=k.length-1);for(var s=k[q],t=k[r],u=q;u<r;u++)k[u]<t&&(t=k[u]),k[u]>s&&(s=k[u]);if(a.aabb.lowerBound[1]>s)return!j&&0;for(var v=0,u=q;u<r;u++){g.set(m,u*l,k[u]),g.set(n,(u+1)*l,k[u+1]),g.add(m,m,h),g.add(n,n,h);var w=100;g.set(o,.5*(n[0]+m[0]),.5*(n[1]+m[1]-w)),g.sub(p.vertices[0],n,o),g.sub(p.vertices[1],m,o),g.copy(p.vertices[2],p.vertices[1]),g.copy(p.vertices[3],p.vertices[0]),p.vertices[2][1]-=w,p.vertices[3][1]-=w,v+=this.convexConvex(a,b,c,d,e,p,o,0,j)}return v}},{"../equations/ContactEquation":21,"../equations/Equation":22,"../equations/FrictionEquation":23,"../math/vec2":30,"../objects/Body":31,"../shapes/Box":37,"../shapes/Circle":39,"../shapes/Convex":40,"../shapes/Shape":45,"../utils/ContactEquationPool":48,"../utils/FrictionEquationPool":49,"../utils/TupleDictionary":56,"../utils/Utils":57}],11:[function(a,b,c){function d(a){a=a||{},this.from=a.from?f.fromValues(a.from[0],a.from[1]):f.create(),this.to=a.to?f.fromValues(a.to[0],a.to[1]):f.create(),this.checkCollisionResponse=void 0===a.checkCollisionResponse||a.checkCollisionResponse,this.skipBackfaces=!!a.skipBackfaces,this.collisionMask=void 0!==a.collisionMask?a.collisionMask:-1,this.collisionGroup=void 0!==a.collisionGroup?a.collisionGroup:-1,this.mode=void 0!==a.mode?a.mode:d.ANY,this.callback=a.callback||function(a){},this.direction=f.create(),this.length=1,this.update()}function e(a,b,c){f.sub(h,c,a);var d=f.dot(h,b);return f.scale(i,b,d),f.add(i,i,a),f.squaredDistance(c,i)}b.exports=d;var f=a("../math/vec2");a("../collision/RaycastResult"),a("../shapes/Shape"),a("../collision/AABB");d.prototype.constructor=d,d.CLOSEST=1,d.ANY=2,d.ALL=4,d.prototype.update=function(){var a=this.direction;f.sub(a,this.to,this.from),this.length=f.length(a),f.normalize(a,a)},d.prototype.intersectBodies=function(a,b){for(var c=0,d=b.length;!a.shouldStop(this)&&c<d;c++){var e=b[c],f=e.getAABB();(f.overlapsRay(this)>=0||f.containsPoint(this.from))&&this.intersectBody(a,e)}};var g=f.create();d.prototype.intersectBody=function(a,b){var c=this.checkCollisionResponse;if(!c||b.collisionResponse)for(var d=g,e=0,h=b.shapes.length;e<h;e++){var i=b.shapes[e];if((!c||i.collisionResponse)&&0!==(this.collisionGroup&i.collisionMask)&&0!==(i.collisionGroup&this.collisionMask)){f.rotate(d,i.position,b.angle),f.add(d,d,b.position);var j=i.angle+b.angle;if(this.intersectShape(a,i,j,d,b),a.shouldStop(this))break}}},d.prototype.intersectShape=function(a,b,c,d,f){var g=this.from,h=e(g,this.direction,d);h>b.boundingRadius*b.boundingRadius||(this._currentBody=f,this._currentShape=b,b.raycast(a,this,d,c),this._currentBody=this._currentShape=null)},d.prototype.getAABB=function(a){var b=this.to,c=this.from;f.set(a.lowerBound,Math.min(b[0],c[0]),Math.min(b[1],c[1])),f.set(a.upperBound,Math.max(b[0],c[0]),Math.max(b[1],c[1]))};f.create();d.prototype.reportIntersection=function(a,b,c,e){var g=(this.from,this.to,this._currentShape),h=this._currentBody;if(!(this.skipBackfaces&&f.dot(c,this.direction)>0))switch(this.mode){case d.ALL:a.set(c,g,h,b,e),this.callback(a);break;case d.CLOSEST:(b<a.fraction||!a.hasHit())&&a.set(c,g,h,b,e);break;case d.ANY:a.set(c,g,h,b,e)}};var h=f.create(),i=f.create()},{"../collision/AABB":7,"../collision/RaycastResult":12,"../math/vec2":30,"../shapes/Shape":45}],12:[function(a,b,c){function d(){this.normal=e.create(),this.shape=null,this.body=null,this.faceIndex=-1,this.fraction=-1,this.isStopped=!1}var e=a("../math/vec2"),f=a("../collision/Ray");b.exports=d,d.prototype.reset=function(){e.set(this.normal,0,0),this.shape=null,this.body=null,this.faceIndex=-1,this.fraction=-1,this.isStopped=!1},d.prototype.getHitDistance=function(a){return e.distance(a.from,a.to)*this.fraction},d.prototype.hasHit=function(){return this.fraction!==-1},d.prototype.getHitPoint=function(a,b){e.lerp(a,b.from,b.to,this.fraction)},d.prototype.stop=function(){this.isStopped=!0},d.prototype.shouldStop=function(a){return this.isStopped||this.fraction!==-1&&a.mode===f.ANY},d.prototype.set=function(a,b,c,d,f){e.copy(this.normal,a),this.shape=b,this.body=c,this.fraction=d,this.faceIndex=f}},{"../collision/Ray":11,"../math/vec2":30}],13:[function(a,b,c){function d(){f.call(this,f.SAP),this.axisList=[],this.axisIndex=0;var a=this;this._addBodyHandler=function(b){a.axisList.push(b.body)},this._removeBodyHandler=function(b){var c=a.axisList.indexOf(b.body);c!==-1&&a.axisList.splice(c,1)}}var e=a("../utils/Utils"),f=a("../collision/Broadphase");b.exports=d,d.prototype=new f,d.prototype.constructor=d,d.prototype.setWorld=function(a){this.axisList.length=0,e.appendArray(this.axisList,a.bodies),a.off("addBody",this._addBodyHandler).off("removeBody",this._removeBodyHandler),a.on("addBody",this._addBodyHandler).on("removeBody",this._removeBodyHandler),this.world=a},d.sortAxisList=function(a,b){b=0|b;for(var c=1,d=a.length;c<d;c++){for(var e=a[c],f=c-1;f>=0&&!(a[f].aabb.lowerBound[b]<=e.aabb.lowerBound[b]);f--)a[f+1]=a[f];a[f+1]=e}return a},d.prototype.sortList=function(){var a=this.axisList,b=this.axisIndex;d.sortAxisList(a,b)},d.prototype.getCollisionPairs=function(a){var b=this.axisList,c=this.result,d=this.axisIndex;c.length=0;for(var e=b.length;e--;){var g=b[e];g.aabbNeedsUpdate&&g.updateAABB()}this.sortList();for(var h=0,i=0|b.length;h!==i;h++)for(var j=b[h],k=h+1;k<i;k++){var l=b[k],m=l.aabb.lowerBound[d]<=j.aabb.upperBound[d];if(!m)break;f.canCollide(j,l)&&this.boundingVolumeCheck(j,l)&&c.push(j,l)}return c},d.prototype.aabbQuery=function(a,b,c){c=c||[],this.sortList();var d=this.axisIndex,e="x";1===d&&(e="y"),2===d&&(e="z");for(var f=this.axisList,g=(b.lowerBound[e],b.upperBound[e],0);g<f.length;g++){var h=f[g];h.aabbNeedsUpdate&&h.updateAABB(),h.aabb.overlaps(b)&&c.push(h)}return c}},{"../collision/Broadphase":8,"../utils/Utils":57}],14:[function(a,b,c){function d(a,b,c,d){this.type=c,d=e.defaults(d,{collideConnected:!0,wakeUpBodies:!0}),this.equations=[],this.bodyA=a,this.bodyB=b,this.collideConnected=d.collideConnected,d.wakeUpBodies&&(a&&a.wakeUp(),b&&b.wakeUp())}b.exports=d;var e=a("../utils/Utils");d.prototype.update=function(){throw new Error("method update() not implmemented in this Constraint subclass!")},d.DISTANCE=1,d.GEAR=2,d.LOCK=3,d.PRISMATIC=4,d.REVOLUTE=5,d.prototype.setStiffness=function(a){for(var b=this.equations,c=0;c!==b.length;c++){var d=b[c];d.stiffness=a,d.needsUpdate=!0}},d.prototype.setRelaxation=function(a){for(var b=this.equations,c=0;c!==b.length;c++){var d=b[c];d.relaxation=a,d.needsUpdate=!0}}},{"../utils/Utils":57}],15:[function(a,b,c){function d(a,b,c){c=h.defaults(c,{localAnchorA:[0,0],localAnchorB:[0,0]}),e.call(this,a,b,e.DISTANCE,c),this.localAnchorA=g.fromValues(c.localAnchorA[0],c.localAnchorA[1]),this.localAnchorB=g.fromValues(c.localAnchorB[0],c.localAnchorB[1]);var d=this.localAnchorA,i=this.localAnchorB;if(this.distance=0,"number"==typeof c.distance)this.distance=c.distance;else{var j=g.create(),k=g.create(),l=g.create();g.rotate(j,d,a.angle),g.rotate(k,i,b.angle),g.add(l,b.position,k),g.sub(l,l,j),g.sub(l,l,a.position),this.distance=g.length(l)}var m;m="undefined"==typeof c.maxForce?Number.MAX_VALUE:c.maxForce;var n=new f(a,b,(-m),m);this.equations=[n],this.maxForce=m;var l=g.create(),o=g.create(),p=g.create(),q=this;n.computeGq=function(){var a=this.bodyA,b=this.bodyB,c=a.position,e=b.position;return g.rotate(o,d,a.angle),g.rotate(p,i,b.angle),g.add(l,e,p),g.sub(l,l,o),g.sub(l,l,c),g.length(l)-q.distance},this.setMaxForce(m),this.upperLimitEnabled=!1,this.upperLimit=1,this.lowerLimitEnabled=!1,this.lowerLimit=0,this.position=0}var e=a("./Constraint"),f=a("../equations/Equation"),g=a("../math/vec2"),h=a("../utils/Utils");b.exports=d,d.prototype=new e,d.prototype.constructor=d;var i=g.create(),j=g.create(),k=g.create();d.prototype.update=function(){var a=this.equations[0],b=this.bodyA,c=this.bodyB,d=(this.distance,b.position),e=c.position,f=this.equations[0],h=a.G;g.rotate(j,this.localAnchorA,b.angle),g.rotate(k,this.localAnchorB,c.angle),g.add(i,e,k),g.sub(i,i,j),g.sub(i,i,d),this.position=g.length(i);var l=!1;if(this.upperLimitEnabled&&this.position>this.upperLimit&&(f.maxForce=0,f.minForce=-this.maxForce,this.distance=this.upperLimit,l=!0),this.lowerLimitEnabled&&this.position<this.lowerLimit&&(f.maxForce=this.maxForce,f.minForce=0,this.distance=this.lowerLimit,l=!0),(this.lowerLimitEnabled||this.upperLimitEnabled)&&!l)return void(f.enabled=!1);f.enabled=!0,g.normalize(i,i);var m=g.crossLength(j,i),n=g.crossLength(k,i);h[0]=-i[0],h[1]=-i[1],h[2]=-m,h[3]=i[0],h[4]=i[1],h[5]=n},d.prototype.setMaxForce=function(a){var b=this.equations[0];b.minForce=-a,b.maxForce=a},d.prototype.getMaxForce=function(){var a=this.equations[0];return a.maxForce}},{"../equations/Equation":22,"../math/vec2":30,"../utils/Utils":57,"./Constraint":14}],16:[function(a,b,c){function d(a,b,c){c=c||{},e.call(this,a,b,e.GEAR,c),this.ratio=void 0!==c.ratio?c.ratio:1,this.angle=void 0!==c.angle?c.angle:b.angle-this.ratio*a.angle,c.angle=this.angle,c.ratio=this.ratio,this.equations=[new f(a,b,c)],void 0!==c.maxTorque&&this.setMaxTorque(c.maxTorque)}var e=a("./Constraint"),f=(a("../equations/Equation"),a("../equations/AngleLockEquation"));a("../math/vec2");b.exports=d,d.prototype=new e,d.prototype.constructor=d,d.prototype.update=function(){var a=this.equations[0];a.ratio!==this.ratio&&a.setRatio(this.ratio),a.angle=this.angle},d.prototype.setMaxTorque=function(a){this.equations[0].setMaxTorque(a)},d.prototype.getMaxTorque=function(a){return this.equations[0].maxForce}},{"../equations/AngleLockEquation":20,"../equations/Equation":22,"../math/vec2":30,"./Constraint":14}],17:[function(a,b,c){function d(a,b,c){c=c||{},e.call(this,a,b,e.LOCK,c);var d="undefined"==typeof c.maxForce?Number.MAX_VALUE:c.maxForce,h=(c.localAngleB||0,new g(a,b,(-d),d)),i=new g(a,b,(-d),d),j=new g(a,b,(-d),d),k=f.create(),l=f.create(),m=this;h.computeGq=function(){return f.rotate(k,m.localOffsetB,a.angle),f.sub(l,b.position,a.position),f.sub(l,l,k),l[0]},i.computeGq=function(){return f.rotate(k,m.localOffsetB,a.angle),f.sub(l,b.position,a.position),f.sub(l,l,k),l[1]};var n=f.create(),o=f.create();j.computeGq=function(){return f.rotate(n,m.localOffsetB,b.angle-m.localAngleB),f.scale(n,n,-1),f.sub(l,a.position,b.position),f.add(l,l,n),f.rotate(o,n,-Math.PI/2),f.normalize(o,o),f.dot(l,o)},this.localOffsetB=f.create(),c.localOffsetB?f.copy(this.localOffsetB,c.localOffsetB):(f.sub(this.localOffsetB,b.position,a.position),f.rotate(this.localOffsetB,this.localOffsetB,-a.angle)),this.localAngleB=0,"number"==typeof c.localAngleB?this.localAngleB=c.localAngleB:this.localAngleB=b.angle-a.angle,this.equations.push(h,i,j),this.setMaxForce(d)}var e=a("./Constraint"),f=a("../math/vec2"),g=a("../equations/Equation");b.exports=d,d.prototype=new e,d.prototype.constructor=d,d.prototype.setMaxForce=function(a){for(var b=this.equations,c=0;c<this.equations.length;c++)b[c].maxForce=a,b[c].minForce=-a},d.prototype.getMaxForce=function(){return this.equations[0].maxForce};var h=f.create(),i=f.create(),j=f.create(),k=f.fromValues(1,0),l=f.fromValues(0,1);d.prototype.update=function(){var a=this.equations[0],b=this.equations[1],c=this.equations[2],d=this.bodyA,e=this.bodyB;f.rotate(h,this.localOffsetB,d.angle),f.rotate(i,this.localOffsetB,e.angle-this.localAngleB),f.scale(i,i,-1),f.rotate(j,i,Math.PI/2),f.normalize(j,j),a.G[0]=-1,a.G[1]=0,a.G[2]=-f.crossLength(h,k),a.G[3]=1,b.G[0]=0,b.G[1]=-1,b.G[2]=-f.crossLength(h,l),b.G[4]=1,c.G[0]=-j[0],c.G[1]=-j[1],c.G[3]=j[0],c.G[4]=j[1],c.G[5]=f.crossLength(i,j)}},{"../equations/Equation":22,"../math/vec2":30,"./Constraint":14}],18:[function(a,b,c){function d(a,b,c){c=c||{},e.call(this,a,b,e.PRISMATIC,c);var d=h.fromValues(0,0),j=h.fromValues(1,0),k=h.fromValues(0,0);c.localAnchorA&&h.copy(d,c.localAnchorA),c.localAxisA&&h.copy(j,c.localAxisA),c.localAnchorB&&h.copy(k,c.localAnchorB),this.localAnchorA=d,this.localAnchorB=k,this.localAxisA=j;var l=this.maxForce="undefined"!=typeof c.maxForce?c.maxForce:Number.MAX_VALUE,m=new g(a,b,(-l),l),n=new h.create,o=new h.create,p=new h.create,q=new h.create;if(m.computeGq=function(){return h.dot(p,q)},m.updateJacobian=function(){var c=this.G,e=a.position,f=b.position;h.rotate(n,d,a.angle),h.rotate(o,k,b.angle),h.add(p,f,o),h.sub(p,p,e),h.sub(p,p,n),h.rotate(q,j,a.angle+Math.PI/2),c[0]=-q[0],c[1]=-q[1],c[2]=-h.crossLength(n,q)+h.crossLength(q,p),c[3]=q[0],c[4]=q[1],c[5]=h.crossLength(o,q)},this.equations.push(m),!c.disableRotationalLock){var r=new i(a,b,(-l),l);this.equations.push(r)}this.position=0,this.velocity=0,this.lowerLimitEnabled="undefined"!=typeof c.lowerLimit,this.upperLimitEnabled="undefined"!=typeof c.upperLimit,this.lowerLimit="undefined"!=typeof c.lowerLimit?c.lowerLimit:0,this.upperLimit="undefined"!=typeof c.upperLimit?c.upperLimit:1,this.upperLimitEquation=new f(a,b),this.lowerLimitEquation=new f(a,b),this.upperLimitEquation.minForce=this.lowerLimitEquation.minForce=0,this.upperLimitEquation.maxForce=this.lowerLimitEquation.maxForce=l,this.motorEquation=new g(a,b),this.motorEnabled=!1,this.motorSpeed=0;var s=this,t=this.motorEquation;t.computeGW;t.computeGq=function(){return 0},t.computeGW=function(){var a=this.G,b=this.bodyA,c=this.bodyB,d=b.velocity,e=c.velocity,f=b.angularVelocity,g=c.angularVelocity;return this.gmult(a,d,f,e,g)+s.motorSpeed}}var e=a("./Constraint"),f=a("../equations/ContactEquation"),g=a("../equations/Equation"),h=a("../math/vec2"),i=a("../equations/RotationalLockEquation");b.exports=d,d.prototype=new e,d.prototype.constructor=d;var j=h.create(),k=h.create(),l=h.create(),m=h.create(),n=h.create(),o=h.create();d.prototype.update=function(){var a=this.equations,b=a[0],c=this.upperLimit,d=this.lowerLimit,e=this.upperLimitEquation,f=this.lowerLimitEquation,g=this.bodyA,i=this.bodyB,p=this.localAxisA,q=this.localAnchorA,r=this.localAnchorB;b.updateJacobian(),h.rotate(j,p,g.angle),h.rotate(m,q,g.angle),h.add(k,m,g.position),h.rotate(n,r,i.angle),h.add(l,n,i.position);var s=this.position=h.dot(l,j)-h.dot(k,j);if(this.motorEnabled){var t=this.motorEquation.G;t[0]=j[0],t[1]=j[1],t[2]=h.crossLength(j,n),t[3]=-j[0],t[4]=-j[1],t[5]=-h.crossLength(j,m)}if(this.upperLimitEnabled&&s>c)h.scale(e.normalA,j,-1),h.sub(e.contactPointA,k,g.position),h.sub(e.contactPointB,l,i.position),h.scale(o,j,c),h.add(e.contactPointA,e.contactPointA,o),a.indexOf(e)===-1&&a.push(e);else{var u=a.indexOf(e);u!==-1&&a.splice(u,1)}if(this.lowerLimitEnabled&&s<d)h.scale(f.normalA,j,1),h.sub(f.contactPointA,k,g.position),h.sub(f.contactPointB,l,i.position),h.scale(o,j,d),h.sub(f.contactPointB,f.contactPointB,o),a.indexOf(f)===-1&&a.push(f);else{var u=a.indexOf(f);u!==-1&&a.splice(u,1)}},d.prototype.enableMotor=function(){this.motorEnabled||(this.equations.push(this.motorEquation),this.motorEnabled=!0)},d.prototype.disableMotor=function(){if(this.motorEnabled){var a=this.equations.indexOf(this.motorEquation);this.equations.splice(a,1),this.motorEnabled=!1}},d.prototype.setLimits=function(a,b){"number"==typeof a?(this.lowerLimit=a,this.lowerLimitEnabled=!0):(this.lowerLimit=a,this.lowerLimitEnabled=!1),"number"==typeof b?(this.upperLimit=b,this.upperLimitEnabled=!0):(this.upperLimit=b,this.upperLimitEnabled=!1)}},{"../equations/ContactEquation":21,"../equations/Equation":22,"../equations/RotationalLockEquation":24,"../math/vec2":30,"./Constraint":14}],19:[function(a,b,c){function d(a,b,c){c=c||{},e.call(this,a,b,e.REVOLUTE,c);var d=this.maxForce="undefined"!=typeof c.maxForce?c.maxForce:Number.MAX_VALUE;this.pivotA=i.create(),this.pivotB=i.create(),c.worldPivot?(i.sub(this.pivotA,c.worldPivot,a.position),i.sub(this.pivotB,c.worldPivot,b.position),i.rotate(this.pivotA,this.pivotA,-a.angle),i.rotate(this.pivotB,this.pivotB,-b.angle)):(i.copy(this.pivotA,c.localPivotA),i.copy(this.pivotB,c.localPivotB));var o=this.equations=[new f(a,b,(-d),d),new f(a,b,(-d),d)],p=o[0],q=o[1],r=this;p.computeGq=function(){return i.rotate(j,r.pivotA,a.angle),i.rotate(k,r.pivotB,b.angle),i.add(n,b.position,k),i.sub(n,n,a.position),i.sub(n,n,j),i.dot(n,l)},q.computeGq=function(){return i.rotate(j,r.pivotA,a.angle),i.rotate(k,r.pivotB,b.angle),i.add(n,b.position,k),i.sub(n,n,a.position),i.sub(n,n,j),i.dot(n,m)},q.minForce=p.minForce=-d,q.maxForce=p.maxForce=d,this.motorEquation=new g(a,b),this.motorEnabled=!1,this.angle=0,this.lowerLimitEnabled=!1,this.upperLimitEnabled=!1,this.lowerLimit=0,this.upperLimit=0,this.upperLimitEquation=new h(a,b),this.lowerLimitEquation=new h(a,b),this.upperLimitEquation.minForce=0,this.lowerLimitEquation.maxForce=0}var e=a("./Constraint"),f=a("../equations/Equation"),g=a("../equations/RotationalVelocityEquation"),h=a("../equations/RotationalLockEquation"),i=a("../math/vec2");b.exports=d;var j=i.create(),k=i.create(),l=i.fromValues(1,0),m=i.fromValues(0,1),n=i.create();d.prototype=new e,d.prototype.constructor=d,d.prototype.setLimits=function(a,b){"number"==typeof a?(this.lowerLimit=a,this.lowerLimitEnabled=!0):(this.lowerLimit=a,this.lowerLimitEnabled=!1),"number"==typeof b?(this.upperLimit=b,this.upperLimitEnabled=!0):(this.upperLimit=b,this.upperLimitEnabled=!1)},d.prototype.update=function(){var a=this.bodyA,b=this.bodyB,c=this.pivotA,d=this.pivotB,e=this.equations,f=(e[0],e[1],e[0]),g=e[1],h=this.upperLimit,n=this.lowerLimit,o=this.upperLimitEquation,p=this.lowerLimitEquation,q=this.angle=b.angle-a.angle;if(this.upperLimitEnabled&&q>h)o.angle=h,e.indexOf(o)===-1&&e.push(o);else{var r=e.indexOf(o);r!==-1&&e.splice(r,1)}if(this.lowerLimitEnabled&&q<n)p.angle=n,e.indexOf(p)===-1&&e.push(p);else{var r=e.indexOf(p);r!==-1&&e.splice(r,1)}i.rotate(j,c,a.angle),i.rotate(k,d,b.angle),f.G[0]=-1,f.G[1]=0,f.G[2]=-i.crossLength(j,l),f.G[3]=1,f.G[4]=0,f.G[5]=i.crossLength(k,l),g.G[0]=0,g.G[1]=-1,g.G[2]=-i.crossLength(j,m),g.G[3]=0,g.G[4]=1,g.G[5]=i.crossLength(k,m)},d.prototype.enableMotor=function(){this.motorEnabled||(this.equations.push(this.motorEquation),this.motorEnabled=!0)},d.prototype.disableMotor=function(){if(this.motorEnabled){var a=this.equations.indexOf(this.motorEquation);this.equations.splice(a,1),this.motorEnabled=!1}},d.prototype.motorIsEnabled=function(){return!!this.motorEnabled},d.prototype.setMotorSpeed=function(a){if(this.motorEnabled){var b=this.equations.indexOf(this.motorEquation);this.equations[b].relativeVelocity=a}},d.prototype.getMotorSpeed=function(){return!!this.motorEnabled&&this.motorEquation.relativeVelocity}},{"../equations/Equation":22,"../equations/RotationalLockEquation":24,"../equations/RotationalVelocityEquation":25,"../math/vec2":30,"./Constraint":14}],20:[function(a,b,c){function d(a,b,c){c=c||{},e.call(this,a,b,-Number.MAX_VALUE,Number.MAX_VALUE),this.angle=c.angle||0,this.ratio="number"==typeof c.ratio?c.ratio:1,this.setRatio(this.ratio)}var e=a("./Equation");a("../math/vec2");b.exports=d,d.prototype=new e,d.prototype.constructor=d,d.prototype.computeGq=function(){return this.ratio*this.bodyA.angle-this.bodyB.angle+this.angle},d.prototype.setRatio=function(a){var b=this.G;b[2]=a,b[5]=-1,this.ratio=a},d.prototype.setMaxTorque=function(a){this.maxForce=a,this.minForce=-a}},{"../math/vec2":30,"./Equation":22}],21:[function(a,b,c){function d(a,b){e.call(this,a,b,0,Number.MAX_VALUE),this.contactPointA=f.create(),this.penetrationVec=f.create(),this.contactPointB=f.create(),this.normalA=f.create(),this.restitution=0,this.firstImpact=!1,this.shapeA=null,this.shapeB=null}var e=a("./Equation"),f=a("../math/vec2");b.exports=d,d.prototype=new e,d.prototype.constructor=d,d.prototype.computeB=function(a,b,c){var d=this.bodyA,e=this.bodyB,g=this.contactPointA,h=this.contactPointB,i=d.position,j=e.position,k=this.penetrationVec,l=this.normalA,m=this.G,n=f.crossLength(g,l),o=f.crossLength(h,l);m[0]=-l[0],m[1]=-l[1],m[2]=-n,m[3]=l[0],m[4]=l[1],m[5]=o,f.add(k,j,h),f.sub(k,k,i),f.sub(k,k,g);var p,q;this.firstImpact&&0!==this.restitution?(q=0,p=1/b*(1+this.restitution)*this.computeGW()):(q=f.dot(l,k)+this.offset,p=this.computeGW());var r=this.computeGiMf(),s=-q*a-p*b-c*r;return s}},{"../math/vec2":30,"./Equation":22}],22:[function(a,b,c){function d(a,b,c,e){this.minForce="undefined"==typeof c?-Number.MAX_VALUE:c,this.maxForce="undefined"==typeof e?Number.MAX_VALUE:e,this.bodyA=a,this.bodyB=b,this.stiffness=d.DEFAULT_STIFFNESS,this.relaxation=d.DEFAULT_RELAXATION,this.G=new f.ARRAY_TYPE(6);for(var g=0;g<6;g++)this.G[g]=0;this.offset=0,this.a=0,this.b=0,this.epsilon=0,this.timeStep=1/60,this.needsUpdate=!0,this.multiplier=0,this.relativeVelocity=0,this.enabled=!0}b.exports=d;var e=a("../math/vec2"),f=a("../utils/Utils");a("../objects/Body");d.prototype.constructor=d,d.DEFAULT_STIFFNESS=1e6,d.DEFAULT_RELAXATION=4,d.prototype.update=function(){var a=this.stiffness,b=this.relaxation,c=this.timeStep;this.a=4/(c*(1+4*b)),this.b=4*b/(1+4*b),this.epsilon=4/(c*c*a*(1+4*b)),this.needsUpdate=!1},d.prototype.gmult=function(a,b,c,d,e){return a[0]*b[0]+a[1]*b[1]+a[2]*c+a[3]*d[0]+a[4]*d[1]+a[5]*e},d.prototype.computeB=function(a,b,c){var d=this.computeGW(),e=this.computeGq(),f=this.computeGiMf();return-e*a-d*b-f*c};var g=e.create(),h=e.create();d.prototype.computeGq=function(){var a=this.G,b=this.bodyA,c=this.bodyB,d=(b.position,c.position,b.angle),e=c.angle;return this.gmult(a,g,d,h,e)+this.offset},d.prototype.computeGW=function(){var a=this.G,b=this.bodyA,c=this.bodyB,d=b.velocity,e=c.velocity,f=b.angularVelocity,g=c.angularVelocity;return this.gmult(a,d,f,e,g)+this.relativeVelocity},d.prototype.computeGWlambda=function(){var a=this.G,b=this.bodyA,c=this.bodyB,d=b.vlambda,e=c.vlambda,f=b.wlambda,g=c.wlambda;return this.gmult(a,d,f,e,g)};var i=e.create(),j=e.create();d.prototype.computeGiMf=function(){var a=this.bodyA,b=this.bodyB,c=a.force,d=a.angularForce,f=b.force,g=b.angularForce,h=a.invMassSolve,k=b.invMassSolve,l=a.invInertiaSolve,m=b.invInertiaSolve,n=this.G;return e.scale(i,c,h),e.multiply(i,a.massMultiplier,i),e.scale(j,f,k),e.multiply(j,b.massMultiplier,j),this.gmult(n,i,d*l,j,g*m)},d.prototype.computeGiMGt=function(){var a=this.bodyA,b=this.bodyB,c=a.invMassSolve,d=b.invMassSolve,e=a.invInertiaSolve,f=b.invInertiaSolve,g=this.G;return g[0]*g[0]*c*a.massMultiplier[0]+g[1]*g[1]*c*a.massMultiplier[1]+g[2]*g[2]*e+g[3]*g[3]*d*b.massMultiplier[0]+g[4]*g[4]*d*b.massMultiplier[1]+g[5]*g[5]*f};var k=e.create(),l=e.create(),m=e.create();e.create(),e.create(),e.create();d.prototype.addToWlambda=function(a){var b=this.bodyA,c=this.bodyB,d=k,f=l,g=m,h=b.invMassSolve,i=c.invMassSolve,j=b.invInertiaSolve,n=c.invInertiaSolve,o=this.G;f[0]=o[0],f[1]=o[1],g[0]=o[3],g[1]=o[4],e.scale(d,f,h*a),e.multiply(d,d,b.massMultiplier),e.add(b.vlambda,b.vlambda,d),b.wlambda+=j*o[2]*a,e.scale(d,g,i*a),e.multiply(d,d,c.massMultiplier),e.add(c.vlambda,c.vlambda,d),c.wlambda+=n*o[5]*a},d.prototype.computeInvC=function(a){return 1/(this.computeGiMGt()+a)}},{"../math/vec2":30,"../objects/Body":31,"../utils/Utils":57}],23:[function(a,b,c){function d(a,b,c){f.call(this,a,b,-c,c),this.contactPointA=e.create(),this.contactPointB=e.create(),this.t=e.create(),this.contactEquations=[],this.shapeA=null,this.shapeB=null,this.frictionCoefficient=.3}var e=a("../math/vec2"),f=a("./Equation");a("../utils/Utils");b.exports=d,d.prototype=new f,d.prototype.constructor=d,d.prototype.setSlipForce=function(a){this.maxForce=a,this.minForce=-a},d.prototype.getSlipForce=function(){return this.maxForce},d.prototype.computeB=function(a,b,c){var d=(this.bodyA,this.bodyB,this.contactPointA),f=this.contactPointB,g=this.t,h=this.G;h[0]=-g[0],h[1]=-g[1],h[2]=-e.crossLength(d,g),h[3]=g[0],h[4]=g[1],h[5]=e.crossLength(f,g);var i=this.computeGW(),j=this.computeGiMf(),k=-i*b-c*j;return k}},{"../math/vec2":30,"../utils/Utils":57,"./Equation":22}],24:[function(a,b,c){function d(a,b,c){c=c||{},e.call(this,a,b,-Number.MAX_VALUE,Number.MAX_VALUE),this.angle=c.angle||0;var d=this.G;d[2]=1,d[5]=-1}var e=a("./Equation"),f=a("../math/vec2");b.exports=d,d.prototype=new e,d.prototype.constructor=d;var g=f.create(),h=f.create(),i=f.fromValues(1,0),j=f.fromValues(0,1);d.prototype.computeGq=function(){return f.rotate(g,i,this.bodyA.angle+this.angle),f.rotate(h,j,this.bodyB.angle),f.dot(g,h)}},{"../math/vec2":30,"./Equation":22}],25:[function(a,b,c){function d(a,b){e.call(this,a,b,-Number.MAX_VALUE,Number.MAX_VALUE),this.relativeVelocity=1,this.ratio=1}var e=a("./Equation");a("../math/vec2");b.exports=d,d.prototype=new e,d.prototype.constructor=d,d.prototype.computeB=function(a,b,c){var d=this.G;d[2]=-1,d[5]=this.ratio;var e=this.computeGiMf(),f=this.computeGW(),g=-f*b-c*e;return g}},{"../math/vec2":30,"./Equation":22}],26:[function(a,b,c){var d=function(){};b.exports=d,d.prototype={constructor:d,on:function(a,b,c){b.context=c||this,void 0===this._listeners&&(this._listeners={});var d=this._listeners;return void 0===d[a]&&(d[a]=[]),d[a].indexOf(b)===-1&&d[a].push(b),this},has:function(a,b){if(void 0===this._listeners)return!1;var c=this._listeners;if(b){if(void 0!==c[a]&&c[a].indexOf(b)!==-1)return!0}else if(void 0!==c[a])return!0;return!1},off:function(a,b){if(void 0===this._listeners)return this;var c=this._listeners,d=c[a].indexOf(b);return d!==-1&&c[a].splice(d,1),this},emit:function(a){if(void 0===this._listeners)return this;var b=this._listeners,c=b[a.type];if(void 0!==c){a.target=this;for(var d=0,e=c.length;d<e;d++){var f=c[d];f.call(f.context,a)}}return this}}},{}],27:[function(a,b,c){function d(a,b,c){if(c=c||{},!(a instanceof e&&b instanceof e))throw new Error("First two arguments must be Material instances.");this.id=d.idCounter++,this.materialA=a,this.materialB=b,this.friction="undefined"!=typeof c.friction?Number(c.friction):.3,this.restitution="undefined"!=typeof c.restitution?Number(c.restitution):0,this.stiffness="undefined"!=typeof c.stiffness?Number(c.stiffness):f.DEFAULT_STIFFNESS,this.relaxation="undefined"!=typeof c.relaxation?Number(c.relaxation):f.DEFAULT_RELAXATION,this.frictionStiffness="undefined"!=typeof c.frictionStiffness?Number(c.frictionStiffness):f.DEFAULT_STIFFNESS,this.frictionRelaxation="undefined"!=typeof c.frictionRelaxation?Number(c.frictionRelaxation):f.DEFAULT_RELAXATION,this.surfaceVelocity="undefined"!=typeof c.surfaceVelocity?Number(c.surfaceVelocity):0,this.contactSkinSize=.005}var e=a("./Material"),f=a("../equations/Equation");b.exports=d,d.idCounter=0},{"../equations/Equation":22,"./Material":28}],28:[function(a,b,c){function d(a){this.id=a||d.idCounter++}b.exports=d,d.idCounter=0},{}],29:[function(a,b,c){var d={};d.GetArea=function(a){if(a.length<6)return 0;for(var b=a.length-2,c=0,d=0;d<b;d+=2)c+=(a[d+2]-a[d])*(a[d+1]+a[d+3]);return c+=(a[0]-a[b])*(a[b+1]+a[1]),.5*-c},d.Triangulate=function(a){var b=a.length>>1;if(b<3)return[];for(var c=[],e=[],f=0;f<b;f++)e.push(f);for(var f=0,g=b;g>3;){var h=e[(f+0)%g],i=e[(f+1)%g],j=e[(f+2)%g],k=a[2*h],l=a[2*h+1],m=a[2*i],n=a[2*i+1],o=a[2*j],p=a[2*j+1],q=!1;if(d._convex(k,l,m,n,o,p)){q=!0;for(var r=0;r<g;r++){var s=e[r];if(s!=h&&s!=i&&s!=j&&d._PointInTriangle(a[2*s],a[2*s+1],k,l,m,n,o,p)){q=!1;break}}}if(q)c.push(h,i,j),e.splice((f+1)%g,1),g--,f=0;else if(f++>3*g)break}return c.push(e[0],e[1],e[2]),c},d._PointInTriangle=function(a,b,c,d,e,f,g,h){var i=g-c,j=h-d,k=e-c,l=f-d,m=a-c,n=b-d,o=i*i+j*j,p=i*k+j*l,q=i*m+j*n,r=k*k+l*l,s=k*m+l*n,t=1/(o*r-p*p),u=(r*q-p*s)*t,v=(o*s-p*q)*t;return u>=0&&v>=0&&u+v<1},d._convex=function(a,b,c,d,e,f){return(b-d)*(e-c)+(c-a)*(f-d)>=0},b.exports=d},{}],30:[function(a,b,c){var d=b.exports={},e=a("../utils/Utils");d.crossLength=function(a,b){return a[0]*b[1]-a[1]*b[0]},d.crossVZ=function(a,b,c){return d.rotate(a,b,-Math.PI/2),d.scale(a,a,c),a},d.crossZV=function(a,b,c){return d.rotate(a,c,Math.PI/2),d.scale(a,a,b),a},d.rotate=function(a,b,c){if(0!==c){var d=Math.cos(c),e=Math.sin(c),f=b[0],g=b[1];a[0]=d*f-e*g,a[1]=e*f+d*g}else a[0]=b[0],a[1]=b[1]},d.rotate90cw=function(a,b){var c=b[0],d=b[1];a[0]=d,a[1]=-c},d.toLocalFrame=function(a,b,c,e){d.copy(a,b),d.sub(a,a,c),d.rotate(a,a,-e)},d.toGlobalFrame=function(a,b,c,e){d.copy(a,b),d.rotate(a,a,e),d.add(a,a,c)},d.vectorToLocalFrame=function(a,b,c){d.rotate(a,b,-c)},d.vectorToGlobalFrame=function(a,b,c){d.rotate(a,b,c)},d.centroid=function(a,b,c,e){return d.add(a,b,c),d.add(a,a,e),d.scale(a,a,1/3),a},d.create=function(){var a=new e.ARRAY_TYPE(2);return a[0]=0,a[1]=0,a},d.clone=function(a){var b=new e.ARRAY_TYPE(2);return b[0]=a[0],b[1]=a[1],b},d.fromValues=function(a,b){var c=new e.ARRAY_TYPE(2);return c[0]=a,c[1]=b,c},d.copy=function(a,b){return a[0]=b[0],a[1]=b[1],a},d.set=function(a,b,c){return a[0]=b,a[1]=c,a},d.add=function(a,b,c){return a[0]=b[0]+c[0],a[1]=b[1]+c[1],a},d.subtract=function(a,b,c){return a[0]=b[0]-c[0],a[1]=b[1]-c[1],a},d.sub=d.subtract,d.multiply=function(a,b,c){return a[0]=b[0]*c[0],a[1]=b[1]*c[1],a},d.mul=d.multiply,d.divide=function(a,b,c){return a[0]=b[0]/c[0],a[1]=b[1]/c[1],a},d.div=d.divide,d.scale=function(a,b,c){return a[0]=b[0]*c,a[1]=b[1]*c,a},d.distance=function(a,b){var c=b[0]-a[0],d=b[1]-a[1];return Math.sqrt(c*c+d*d)},d.dist=d.distance,d.squaredDistance=function(a,b){var c=b[0]-a[0],d=b[1]-a[1];return c*c+d*d},d.sqrDist=d.squaredDistance,d.length=function(a){var b=a[0],c=a[1];return Math.sqrt(b*b+c*c)},d.len=d.length,d.squaredLength=function(a){var b=a[0],c=a[1];return b*b+c*c},d.sqrLen=d.squaredLength,d.negate=function(a,b){return a[0]=-b[0],a[1]=-b[1],a},d.normalize=function(a,b){var c=b[0],d=b[1],e=c*c+d*d;return e>0&&(e=1/Math.sqrt(e),a[0]=b[0]*e,a[1]=b[1]*e),a},d.dot=function(a,b){return a[0]*b[0]+a[1]*b[1]},d.str=function(a){return"vec2("+a[0]+", "+a[1]+")"},d.lerp=function(a,b,c,d){var e=b[0],f=b[1];return a[0]=e+d*(c[0]-e),a[1]=f+d*(c[1]-f),a},d.reflect=function(a,b,c){var d=b[0]*c[0]+b[1]*c[1];a[0]=b[0]-2*c[0]*d,a[1]=b[1]-2*c[1]*d},d.getLineSegmentsIntersection=function(a,b,c,e,f){var g=d.getLineSegmentsIntersectionFraction(b,c,e,f);return!(g<0)&&(a[0]=b[0]+g*(c[0]-b[0]),a[1]=b[1]+g*(c[1]-b[1]),!0)},d.getLineSegmentsIntersectionFraction=function(a,b,c,d){var e,f,g=b[0]-a[0],h=b[1]-a[1],i=d[0]-c[0],j=d[1]-c[1];return e=(-h*(a[0]-c[0])+g*(a[1]-c[1]))/(-i*h+g*j),f=(i*(a[1]-c[1])-j*(a[0]-c[0]))/(-i*h+g*j),e>=0&&e<=1&&f>=0&&f<=1?f:-1}},{"../utils/Utils":57}],31:[function(a,b,c){function d(a){a=a||{},k.call(this),this.id=a.id||++d._idCounter,this.world=null,this.shapes=[],this.mass=a.mass||0,this.invMass=0,this.inertia=0,this.invInertia=0,this.invMassSolve=0,this.invInertiaSolve=0,this.fixedRotation=!!a.fixedRotation,this.fixedX=!!a.fixedX,this.fixedY=!!a.fixedY,this.massMultiplier=e.create(),this.position=e.fromValues(0,0),a.position&&e.copy(this.position,a.position),this.interpolatedPosition=e.fromValues(0,0),this.interpolatedAngle=0,this.previousPosition=e.fromValues(0,0),this.previousAngle=0,this.velocity=e.fromValues(0,0),a.velocity&&e.copy(this.velocity,a.velocity),this.vlambda=e.fromValues(0,0),this.wlambda=0,this.angle=a.angle||0,this.angularVelocity=a.angularVelocity||0,this.force=e.create(),a.force&&e.copy(this.force,a.force),this.angularForce=a.angularForce||0,this.damping="number"==typeof a.damping?a.damping:.1,this.angularDamping="number"==typeof a.angularDamping?a.angularDamping:.1,this.type=d.STATIC,"undefined"!=typeof a.type?this.type=a.type:a.mass?this.type=d.DYNAMIC:this.type=d.STATIC,this.boundingRadius=0,this.aabb=new j,this.aabbNeedsUpdate=!0,this.allowSleep=void 0===a.allowSleep||a.allowSleep,
this.wantsToSleep=!1,this.sleepState=d.AWAKE,this.sleepSpeedLimit=void 0!==a.sleepSpeedLimit?a.sleepSpeedLimit:.2,this.sleepTimeLimit=void 0!==a.sleepTimeLimit?a.sleepTimeLimit:1,this.gravityScale=void 0!==a.gravityScale?a.gravityScale:1,this.collisionResponse=void 0===a.collisionResponse||a.collisionResponse,this.idleTime=0,this.timeLastSleepy=0,this.ccdSpeedThreshold=void 0!==a.ccdSpeedThreshold?a.ccdSpeedThreshold:-1,this.ccdIterations=void 0!==a.ccdIterations?a.ccdIterations:10,this.concavePath=null,this._wakeUpAfterNarrowphase=!1,this.updateMassProperties()}var e=a("../math/vec2"),f=a("poly-decomp"),g=a("../shapes/Convex"),h=a("../collision/RaycastResult"),i=a("../collision/Ray"),j=a("../collision/AABB"),k=a("../events/EventEmitter");b.exports=d,d.prototype=new k,d.prototype.constructor=d,d._idCounter=0,d.prototype.updateSolveMassProperties=function(){this.sleepState===d.SLEEPING||this.type===d.KINEMATIC?(this.invMassSolve=0,this.invInertiaSolve=0):(this.invMassSolve=this.invMass,this.invInertiaSolve=this.invInertia)},d.prototype.setDensity=function(a){var b=this.getArea();this.mass=b*a,this.updateMassProperties()},d.prototype.getArea=function(){for(var a=0,b=0;b<this.shapes.length;b++)a+=this.shapes[b].area;return a},d.prototype.getAABB=function(){return this.aabbNeedsUpdate&&this.updateAABB(),this.aabb};var l=new j,m=e.create();d.prototype.updateAABB=function(){for(var a=this.shapes,b=a.length,c=m,d=this.angle,f=0;f!==b;f++){var g=a[f],h=g.angle+d;e.rotate(c,g.position,d),e.add(c,c,this.position),g.computeAABB(l,c,h),0===f?this.aabb.copy(l):this.aabb.extend(l)}this.aabbNeedsUpdate=!1},d.prototype.updateBoundingRadius=function(){for(var a=this.shapes,b=a.length,c=0,d=0;d!==b;d++){var f=a[d],g=e.length(f.position),h=f.boundingRadius;g+h>c&&(c=g+h)}this.boundingRadius=c},d.prototype.addShape=function(a,b,c){if(a.body)throw new Error("A shape can only be added to one body.");a.body=this,b?e.copy(a.position,b):e.set(a.position,0,0),a.angle=c||0,this.shapes.push(a),this.updateMassProperties(),this.updateBoundingRadius(),this.aabbNeedsUpdate=!0},d.prototype.removeShape=function(a){var b=this.shapes.indexOf(a);return b!==-1&&(this.shapes.splice(b,1),this.aabbNeedsUpdate=!0,a.body=null,!0)},d.prototype.updateMassProperties=function(){if(this.type===d.STATIC||this.type===d.KINEMATIC)this.mass=Number.MAX_VALUE,this.invMass=0,this.inertia=Number.MAX_VALUE,this.invInertia=0;else{var a=this.shapes,b=a.length,c=this.mass/b,f=0;if(this.fixedRotation)this.inertia=Number.MAX_VALUE,this.invInertia=0;else{for(var g=0;g<b;g++){var h=a[g],i=e.squaredLength(h.position),j=h.computeMomentOfInertia(c);f+=j+c*i}this.inertia=f,this.invInertia=f>0?1/f:0}this.invMass=1/this.mass,e.set(this.massMultiplier,this.fixedX?0:1,this.fixedY?0:1)}};e.create();d.prototype.applyForce=function(a,b){if(e.add(this.force,this.force,a),b){var c=e.crossLength(b,a);this.angularForce+=c}};var n=e.create(),o=e.create(),p=e.create();d.prototype.applyForceLocal=function(a,b){b=b||p;var c=n,d=o;this.vectorToWorldFrame(c,a),this.vectorToWorldFrame(d,b),this.applyForce(c,d)};var q=e.create();d.prototype.applyImpulse=function(a,b){if(this.type===d.DYNAMIC){var c=q;if(e.scale(c,a,this.invMass),e.multiply(c,this.massMultiplier,c),e.add(this.velocity,c,this.velocity),b){var f=e.crossLength(b,a);f*=this.invInertia,this.angularVelocity+=f}}};var r=e.create(),s=e.create(),t=e.create();d.prototype.applyImpulseLocal=function(a,b){b=b||t;var c=r,d=s;this.vectorToWorldFrame(c,a),this.vectorToWorldFrame(d,b),this.applyImpulse(c,d)},d.prototype.toLocalFrame=function(a,b){e.toLocalFrame(a,b,this.position,this.angle)},d.prototype.toWorldFrame=function(a,b){e.toGlobalFrame(a,b,this.position,this.angle)},d.prototype.vectorToLocalFrame=function(a,b){e.vectorToLocalFrame(a,b,this.angle)},d.prototype.vectorToWorldFrame=function(a,b){e.vectorToGlobalFrame(a,b,this.angle)},d.prototype.fromPolygon=function(a,b){b=b||{};for(var c=this.shapes.length;c>=0;--c)this.removeShape(this.shapes[c]);var d=new f.Polygon;if(d.vertices=a,d.makeCCW(),"number"==typeof b.removeCollinearPoints&&d.removeCollinearPoints(b.removeCollinearPoints),"undefined"==typeof b.skipSimpleCheck&&!d.isSimple())return!1;this.concavePath=d.vertices.slice(0);for(var c=0;c<this.concavePath.length;c++){var h=[0,0];e.copy(h,this.concavePath[c]),this.concavePath[c]=h}var i;i=b.optimalDecomp?d.decomp():d.quickDecomp();for(var j=e.create(),c=0;c!==i.length;c++){for(var k=new g({vertices:i[c].vertices}),l=0;l!==k.vertices.length;l++){var h=k.vertices[l];e.sub(h,h,k.centerOfMass)}e.scale(j,k.centerOfMass,1),k.updateTriangles(),k.updateCenterOfMass(),k.updateBoundingRadius(),this.addShape(k,j)}return this.adjustCenterOfMass(),this.aabbNeedsUpdate=!0,!0};var u=(e.fromValues(0,0),e.fromValues(0,0)),v=e.fromValues(0,0),w=e.fromValues(0,0);d.prototype.adjustCenterOfMass=function(){var a=u,b=v,c=w,d=0;e.set(b,0,0);for(var f=0;f!==this.shapes.length;f++){var g=this.shapes[f];e.scale(a,g.position,g.area),e.add(b,b,a),d+=g.area}e.scale(c,b,1/d);for(var f=0;f!==this.shapes.length;f++){var g=this.shapes[f];e.sub(g.position,g.position,c)}e.add(this.position,this.position,c);for(var f=0;this.concavePath&&f<this.concavePath.length;f++)e.sub(this.concavePath[f],this.concavePath[f],c);this.updateMassProperties(),this.updateBoundingRadius()},d.prototype.setZeroForce=function(){e.set(this.force,0,0),this.angularForce=0},d.prototype.resetConstraintVelocity=function(){var a=this,b=a.vlambda;e.set(b,0,0),a.wlambda=0},d.prototype.addConstraintVelocity=function(){var a=this,b=a.velocity;e.add(b,b,a.vlambda),a.angularVelocity+=a.wlambda},d.prototype.applyDamping=function(a){if(this.type===d.DYNAMIC){var b=this.velocity;e.scale(b,b,Math.pow(1-this.damping,a)),this.angularVelocity*=Math.pow(1-this.angularDamping,a)}},d.prototype.wakeUp=function(){var a=this.sleepState;this.sleepState=d.AWAKE,this.idleTime=0,a!==d.AWAKE&&this.emit(d.wakeUpEvent)},d.prototype.sleep=function(){this.sleepState=d.SLEEPING,this.angularVelocity=0,this.angularForce=0,e.set(this.velocity,0,0),e.set(this.force,0,0),this.emit(d.sleepEvent)},d.prototype.sleepTick=function(a,b,c){if(this.allowSleep&&this.type!==d.SLEEPING){this.wantsToSleep=!1;var f=(this.sleepState,e.squaredLength(this.velocity)+Math.pow(this.angularVelocity,2)),g=Math.pow(this.sleepSpeedLimit,2);f>=g?(this.idleTime=0,this.sleepState=d.AWAKE):(this.idleTime+=c,this.sleepState=d.SLEEPY),this.idleTime>this.sleepTimeLimit&&(b?this.wantsToSleep=!0:this.sleep())}},d.prototype.overlaps=function(a){return this.world.overlapKeeper.bodiesAreOverlapping(this,a)};var x=e.create(),y=e.create();d.prototype.integrate=function(a){var b=this.invMass,c=this.force,d=this.position,f=this.velocity;e.copy(this.previousPosition,this.position),this.previousAngle=this.angle,this.fixedRotation||(this.angularVelocity+=this.angularForce*this.invInertia*a),e.scale(x,c,a*b),e.multiply(x,this.massMultiplier,x),e.add(f,x,f),this.integrateToTimeOfImpact(a)||(e.scale(y,f,a),e.add(d,d,y),this.fixedRotation||(this.angle+=this.angularVelocity*a)),this.aabbNeedsUpdate=!0};var z=new h,A=new i({mode:i.ALL}),B=e.create(),C=e.create(),D=e.create(),E=e.create();d.prototype.integrateToTimeOfImpact=function(a){if(this.ccdSpeedThreshold<0||e.squaredLength(this.velocity)<Math.pow(this.ccdSpeedThreshold,2))return!1;e.normalize(B,this.velocity),e.scale(C,this.velocity,a),e.add(C,C,this.position),e.sub(D,C,this.position);var b,c=this.angularVelocity*a,d=e.length(D),f=1,g=this;if(z.reset(),A.callback=function(a){a.body!==g&&(b=a.body,a.getHitPoint(C,A),e.sub(D,C,g.position),f=e.length(D)/d,a.stop())},e.copy(A.from,this.position),e.copy(A.to,C),A.update(),this.world.raycast(z,A),!b)return!1;var h=this.angle;e.copy(E,this.position);for(var i=0,j=0,k=0,l=f;l>=j&&i<this.ccdIterations;){i++,k=(l-j)/2,e.scale(y,D,f),e.add(this.position,E,y),this.angle=h+c*f,this.updateAABB();var m=this.aabb.overlaps(b.aabb)&&this.world.narrowphase.bodiesOverlap(this,b);m?j=k:l=k}return f=k,e.copy(this.position,E),this.angle=h,e.scale(y,D,f),e.add(this.position,this.position,y),this.fixedRotation||(this.angle+=c*f),!0},d.prototype.getVelocityAtPoint=function(a,b){return e.crossVZ(a,b,this.angularVelocity),e.subtract(a,this.velocity,a),a},d.sleepyEvent={type:"sleepy"},d.sleepEvent={type:"sleep"},d.wakeUpEvent={type:"wakeup"},d.DYNAMIC=1,d.STATIC=2,d.KINEMATIC=4,d.AWAKE=0,d.SLEEPY=1,d.SLEEPING=2},{"../collision/AABB":7,"../collision/Ray":11,"../collision/RaycastResult":12,"../events/EventEmitter":26,"../math/vec2":30,"../shapes/Convex":40,"poly-decomp":5}],32:[function(a,b,c){function d(a,b,c){c=c||{},f.call(this,a,b,c),this.localAnchorA=e.fromValues(0,0),this.localAnchorB=e.fromValues(0,0),c.localAnchorA&&e.copy(this.localAnchorA,c.localAnchorA),c.localAnchorB&&e.copy(this.localAnchorB,c.localAnchorB),c.worldAnchorA&&this.setWorldAnchorA(c.worldAnchorA),c.worldAnchorB&&this.setWorldAnchorB(c.worldAnchorB);var d=e.create(),g=e.create();this.getWorldAnchorA(d),this.getWorldAnchorB(g);var h=e.distance(d,g);this.restLength="number"==typeof c.restLength?c.restLength:h}var e=a("../math/vec2"),f=a("./Spring");a("../utils/Utils");b.exports=d,d.prototype=new f,d.prototype.constructor=d,d.prototype.setWorldAnchorA=function(a){this.bodyA.toLocalFrame(this.localAnchorA,a)},d.prototype.setWorldAnchorB=function(a){this.bodyB.toLocalFrame(this.localAnchorB,a)},d.prototype.getWorldAnchorA=function(a){this.bodyA.toWorldFrame(a,this.localAnchorA)},d.prototype.getWorldAnchorB=function(a){this.bodyB.toWorldFrame(a,this.localAnchorB)};var g=e.create(),h=e.create(),i=e.create(),j=e.create(),k=e.create(),l=e.create(),m=e.create(),n=e.create(),o=e.create();d.prototype.applyForce=function(){var a=this.stiffness,b=this.damping,c=this.restLength,d=this.bodyA,f=this.bodyB,p=g,q=h,r=i,s=j,t=o,u=k,v=l,w=m,x=n;this.getWorldAnchorA(u),this.getWorldAnchorB(v),e.sub(w,u,d.position),e.sub(x,v,f.position),e.sub(p,v,u);var y=e.len(p);e.normalize(q,p),e.sub(r,f.velocity,d.velocity),e.crossZV(t,f.angularVelocity,x),e.add(r,r,t),e.crossZV(t,d.angularVelocity,w),e.sub(r,r,t),e.scale(s,q,-a*(y-c)-b*e.dot(r,q)),e.sub(d.force,d.force,s),e.add(f.force,f.force,s);var z=e.crossLength(w,s),A=e.crossLength(x,s);d.angularForce-=z,f.angularForce+=A}},{"../math/vec2":30,"../utils/Utils":57,"./Spring":34}],33:[function(a,b,c){function d(a,b,c){c=c||{},e.call(this,a,b,c),this.restAngle="number"==typeof c.restAngle?c.restAngle:b.angle-a.angle}var e=(a("../math/vec2"),a("./Spring"));b.exports=d,d.prototype=new e,d.prototype.constructor=d,d.prototype.applyForce=function(){var a=this.stiffness,b=this.damping,c=this.restAngle,d=this.bodyA,e=this.bodyB,f=e.angle-d.angle,g=e.angularVelocity-d.angularVelocity,h=-a*(f-c)-b*g*0;d.angularForce-=h,e.angularForce+=h}},{"../math/vec2":30,"./Spring":34}],34:[function(a,b,c){function d(a,b,c){c=e.defaults(c,{stiffness:100,damping:1}),this.stiffness=c.stiffness,this.damping=c.damping,this.bodyA=a,this.bodyB=b}var e=(a("../math/vec2"),a("../utils/Utils"));b.exports=d,d.prototype.applyForce=function(){}},{"../math/vec2":30,"../utils/Utils":57}],35:[function(a,b,c){function d(a,b){b=b||{},this.chassisBody=a,this.wheels=[],this.groundBody=new i({mass:0}),this.world=null;var c=this;this.preStepCallback=function(){c.update()}}function e(a,b){b=b||{},this.vehicle=a,this.forwardEquation=new h(a.chassisBody,a.groundBody),this.sideEquation=new h(a.chassisBody,a.groundBody),this.steerValue=0,this.engineForce=0,this.setSideFriction(void 0!==b.sideFriction?b.sideFriction:5),this.localForwardVector=f.fromValues(0,1),b.localForwardVector&&f.copy(this.localForwardVector,b.localForwardVector),this.localPosition=f.fromValues(0,0),b.localPosition&&f.copy(this.localPosition,b.localPosition),g.apply(this,a.chassisBody,a.groundBody),this.equations.push(this.forwardEquation,this.sideEquation),this.setBrakeForce(0)}var f=a("../math/vec2"),g=(a("../utils/Utils"),a("../constraints/Constraint")),h=a("../equations/FrictionEquation"),i=a("../objects/Body");b.exports=d,d.prototype.addToWorld=function(a){this.world=a,a.addBody(this.groundBody),a.on("preStep",this.preStepCallback);for(var b=0;b<this.wheels.length;b++){var c=this.wheels[b];a.addConstraint(c)}},d.prototype.removeFromWorld=function(){var a=this.world;a.removeBody(this.groundBody),a.off("preStep",this.preStepCallback);for(var b=0;b<this.wheels.length;b++){var c=this.wheels[b];a.removeConstraint(c)}this.world=null},d.prototype.addWheel=function(a){var b=new e(this,a);return this.wheels.push(b),b},d.prototype.update=function(){for(var a=0;a<this.wheels.length;a++)this.wheels[a].update()},e.prototype=new g,e.prototype.setBrakeForce=function(a){this.forwardEquation.setSlipForce(a)},e.prototype.setSideFriction=function(a){this.sideEquation.setSlipForce(a)};var j=f.create(),k=f.create();e.prototype.getSpeed=function(){return this.vehicle.chassisBody.vectorToWorldFrame(k,this.localForwardVector),this.vehicle.chassisBody.getVelocityAtPoint(j,k),f.dot(j,k)};var l=f.create();e.prototype.update=function(){this.vehicle.chassisBody.vectorToWorldFrame(this.forwardEquation.t,this.localForwardVector),f.rotate(this.sideEquation.t,this.localForwardVector,Math.PI/2),this.vehicle.chassisBody.vectorToWorldFrame(this.sideEquation.t,this.sideEquation.t),f.rotate(this.forwardEquation.t,this.forwardEquation.t,this.steerValue),f.rotate(this.sideEquation.t,this.sideEquation.t,this.steerValue),this.vehicle.chassisBody.toWorldFrame(this.forwardEquation.contactPointB,this.localPosition),f.copy(this.sideEquation.contactPointB,this.forwardEquation.contactPointB),this.vehicle.chassisBody.vectorToWorldFrame(this.forwardEquation.contactPointA,this.localPosition),f.copy(this.sideEquation.contactPointA,this.forwardEquation.contactPointA),f.normalize(l,this.forwardEquation.t),f.scale(l,l,this.engineForce),this.vehicle.chassisBody.applyForce(l,this.forwardEquation.contactPointA)}},{"../constraints/Constraint":14,"../equations/FrictionEquation":23,"../math/vec2":30,"../objects/Body":31,"../utils/Utils":57}],36:[function(a,b,c){var d=b.exports={AABB:a("./collision/AABB"),AngleLockEquation:a("./equations/AngleLockEquation"),Body:a("./objects/Body"),Broadphase:a("./collision/Broadphase"),Capsule:a("./shapes/Capsule"),Circle:a("./shapes/Circle"),Constraint:a("./constraints/Constraint"),ContactEquation:a("./equations/ContactEquation"),ContactEquationPool:a("./utils/ContactEquationPool"),ContactMaterial:a("./material/ContactMaterial"),Convex:a("./shapes/Convex"),DistanceConstraint:a("./constraints/DistanceConstraint"),Equation:a("./equations/Equation"),EventEmitter:a("./events/EventEmitter"),FrictionEquation:a("./equations/FrictionEquation"),FrictionEquationPool:a("./utils/FrictionEquationPool"),GearConstraint:a("./constraints/GearConstraint"),GSSolver:a("./solver/GSSolver"),Heightfield:a("./shapes/Heightfield"),Line:a("./shapes/Line"),LockConstraint:a("./constraints/LockConstraint"),Material:a("./material/Material"),Narrowphase:a("./collision/Narrowphase"),NaiveBroadphase:a("./collision/NaiveBroadphase"),Particle:a("./shapes/Particle"),Plane:a("./shapes/Plane"),Pool:a("./utils/Pool"),RevoluteConstraint:a("./constraints/RevoluteConstraint"),PrismaticConstraint:a("./constraints/PrismaticConstraint"),Ray:a("./collision/Ray"),RaycastResult:a("./collision/RaycastResult"),Box:a("./shapes/Box"),RotationalVelocityEquation:a("./equations/RotationalVelocityEquation"),SAPBroadphase:a("./collision/SAPBroadphase"),Shape:a("./shapes/Shape"),Solver:a("./solver/Solver"),Spring:a("./objects/Spring"),TopDownVehicle:a("./objects/TopDownVehicle"),LinearSpring:a("./objects/LinearSpring"),RotationalSpring:a("./objects/RotationalSpring"),Utils:a("./utils/Utils"),World:a("./world/World"),vec2:a("./math/vec2"),version:a("../package.json").version};Object.defineProperty(d,"Rectangle",{get:function(){return console.warn("The Rectangle class has been renamed to Box."),this.Box}})},{"../package.json":6,"./collision/AABB":7,"./collision/Broadphase":8,"./collision/NaiveBroadphase":9,"./collision/Narrowphase":10,"./collision/Ray":11,"./collision/RaycastResult":12,"./collision/SAPBroadphase":13,"./constraints/Constraint":14,"./constraints/DistanceConstraint":15,"./constraints/GearConstraint":16,"./constraints/LockConstraint":17,"./constraints/PrismaticConstraint":18,"./constraints/RevoluteConstraint":19,"./equations/AngleLockEquation":20,"./equations/ContactEquation":21,"./equations/Equation":22,"./equations/FrictionEquation":23,"./equations/RotationalVelocityEquation":25,"./events/EventEmitter":26,"./material/ContactMaterial":27,"./material/Material":28,"./math/vec2":30,"./objects/Body":31,"./objects/LinearSpring":32,"./objects/RotationalSpring":33,"./objects/Spring":34,"./objects/TopDownVehicle":35,"./shapes/Box":37,"./shapes/Capsule":38,"./shapes/Circle":39,"./shapes/Convex":40,"./shapes/Heightfield":41,"./shapes/Line":42,"./shapes/Particle":43,"./shapes/Plane":44,"./shapes/Shape":45,"./solver/GSSolver":46,"./solver/Solver":47,"./utils/ContactEquationPool":48,"./utils/FrictionEquationPool":49,"./utils/Pool":55,"./utils/Utils":57,"./world/World":61}],37:[function(a,b,c){function d(a){"number"==typeof arguments[0]&&"number"==typeof arguments[1]&&(a={width:arguments[0],height:arguments[1]},console.warn("The Rectangle has been renamed to Box and its constructor signature has changed. Please use the following format: new Box({ width: 1, height: 1, ... })")),a=a||{};var b=this.width=a.width||1,c=this.height=a.height||1,d=[e.fromValues(-b/2,-c/2),e.fromValues(b/2,-c/2),e.fromValues(b/2,c/2),e.fromValues(-b/2,c/2)],h=[e.fromValues(1,0),e.fromValues(0,1)];a.vertices=d,a.axes=h,a.type=f.BOX,g.call(this,a)}var e=a("../math/vec2"),f=a("./Shape"),g=a("./Convex");b.exports=d,d.prototype=new g,d.prototype.constructor=d,d.prototype.computeMomentOfInertia=function(a){var b=this.width,c=this.height;return a*(c*c+b*b)/12},d.prototype.updateBoundingRadius=function(){var a=this.width,b=this.height;this.boundingRadius=Math.sqrt(a*a+b*b)/2};e.create(),e.create(),e.create(),e.create();d.prototype.computeAABB=function(a,b,c){a.setFromPoints(this.vertices,b,c,0)},d.prototype.updateArea=function(){this.area=this.width*this.height}},{"../math/vec2":30,"./Convex":40,"./Shape":45}],38:[function(a,b,c){function d(a){"number"==typeof arguments[0]&&"number"==typeof arguments[1]&&(a={length:arguments[0],radius:arguments[1]},console.warn("The Capsule constructor signature has changed. Please use the following format: new Capsule({ radius: 1, length: 1 })")),a=a||{},this.length=a.length||1,this.radius=a.radius||1,a.type=e.CAPSULE,e.call(this,a)}var e=a("./Shape"),f=a("../math/vec2");b.exports=d,d.prototype=new e,d.prototype.constructor=d,d.prototype.computeMomentOfInertia=function(a){var b=this.radius,c=this.length+b,d=2*b;return a*(d*d+c*c)/12},d.prototype.updateBoundingRadius=function(){this.boundingRadius=this.radius+this.length/2},d.prototype.updateArea=function(){this.area=Math.PI*this.radius*this.radius+2*this.radius*this.length};var g=f.create();d.prototype.computeAABB=function(a,b,c){var d=this.radius;f.set(g,this.length/2,0),0!==c&&f.rotate(g,g,c),f.set(a.upperBound,Math.max(g[0]+d,-g[0]+d),Math.max(g[1]+d,-g[1]+d)),f.set(a.lowerBound,Math.min(g[0]-d,-g[0]-d),Math.min(g[1]-d,-g[1]-d)),f.add(a.lowerBound,a.lowerBound,b),f.add(a.upperBound,a.upperBound,b)};var h=f.create(),i=f.create(),j=f.create(),k=f.create(),l=f.fromValues(0,1);d.prototype.raycast=function(a,b,c,d){for(var e=b.from,g=b.to,m=(b.direction,h),n=i,o=j,p=k,q=this.length/2,r=0;r<2;r++){var s=this.radius*(2*r-1);f.set(o,-q,s),f.set(p,q,s),f.toGlobalFrame(o,o,c,d),f.toGlobalFrame(p,p,c,d);var t=f.getLineSegmentsIntersectionFraction(e,g,o,p);if(t>=0&&(f.rotate(n,l,d),f.scale(n,n,2*r-1),b.reportIntersection(a,t,n,-1),a.shouldStop(b)))return}for(var u=Math.pow(this.radius,2)+Math.pow(q,2),r=0;r<2;r++){f.set(o,q*(2*r-1),0),f.toGlobalFrame(o,o,c,d);var v=Math.pow(g[0]-e[0],2)+Math.pow(g[1]-e[1],2),w=2*((g[0]-e[0])*(e[0]-o[0])+(g[1]-e[1])*(e[1]-o[1])),x=Math.pow(e[0]-o[0],2)+Math.pow(e[1]-o[1],2)-Math.pow(this.radius,2),t=Math.pow(w,2)-4*v*x;if(!(t<0))if(0===t){if(f.lerp(m,e,g,t),f.squaredDistance(m,c)>u&&(f.sub(n,m,o),f.normalize(n,n),b.reportIntersection(a,t,n,-1),a.shouldStop(b)))return}else{var y=Math.sqrt(t),z=1/(2*v),A=(-w-y)*z,B=(-w+y)*z;if(A>=0&&A<=1&&(f.lerp(m,e,g,A),f.squaredDistance(m,c)>u&&(f.sub(n,m,o),f.normalize(n,n),b.reportIntersection(a,A,n,-1),a.shouldStop(b))))return;if(B>=0&&B<=1&&(f.lerp(m,e,g,B),f.squaredDistance(m,c)>u&&(f.sub(n,m,o),f.normalize(n,n),b.reportIntersection(a,B,n,-1),a.shouldStop(b))))return}}}},{"../math/vec2":30,"./Shape":45}],39:[function(a,b,c){function d(a){"number"==typeof arguments[0]&&(a={radius:arguments[0]},console.warn("The Circle constructor signature has changed. Please use the following format: new Circle({ radius: 1 })")),a=a||{},this.radius=a.radius||1,a.type=e.CIRCLE,e.call(this,a)}var e=a("./Shape"),f=a("../math/vec2");b.exports=d,d.prototype=new e,d.prototype.constructor=d,d.prototype.computeMomentOfInertia=function(a){var b=this.radius;return a*b*b/2},d.prototype.updateBoundingRadius=function(){this.boundingRadius=this.radius},d.prototype.updateArea=function(){this.area=Math.PI*this.radius*this.radius},d.prototype.computeAABB=function(a,b,c){var d=this.radius;f.set(a.upperBound,d,d),f.set(a.lowerBound,-d,-d),b&&(f.add(a.lowerBound,a.lowerBound,b),f.add(a.upperBound,a.upperBound,b))};var g=f.create(),h=f.create();d.prototype.raycast=function(a,b,c,d){var e=b.from,i=b.to,j=this.radius,k=Math.pow(i[0]-e[0],2)+Math.pow(i[1]-e[1],2),l=2*((i[0]-e[0])*(e[0]-c[0])+(i[1]-e[1])*(e[1]-c[1])),m=Math.pow(e[0]-c[0],2)+Math.pow(e[1]-c[1],2)-Math.pow(j,2),n=Math.pow(l,2)-4*k*m,o=g,p=h;if(!(n<0))if(0===n)f.lerp(o,e,i,n),f.sub(p,o,c),f.normalize(p,p),b.reportIntersection(a,n,p,-1);else{var q=Math.sqrt(n),r=1/(2*k),s=(-l-q)*r,t=(-l+q)*r;if(s>=0&&s<=1&&(f.lerp(o,e,i,s),f.sub(p,o,c),f.normalize(p,p),b.reportIntersection(a,s,p,-1),a.shouldStop(b)))return;t>=0&&t<=1&&(f.lerp(o,e,i,t),f.sub(p,o,c),f.normalize(p,p),b.reportIntersection(a,t,p,-1))}}},{"../math/vec2":30,"./Shape":45}],40:[function(a,b,c){function d(a){Array.isArray(arguments[0])&&(a={vertices:arguments[0],axes:arguments[1]},console.warn("The Convex constructor signature has changed. Please use the following format: new Convex({ vertices: [...], ... })")),a=a||{},this.vertices=[];for(var b=void 0!==a.vertices?a.vertices:[],c=0;c<b.length;c++){var d=f.create();f.copy(d,b[c]),this.vertices.push(d)}if(this.axes=[],a.axes)for(var c=0;c<a.axes.length;c++){var g=f.create();f.copy(g,a.axes[c]),this.axes.push(g)}else for(var c=0;c<this.vertices.length;c++){var h=this.vertices[c],i=this.vertices[(c+1)%this.vertices.length],j=f.create();f.sub(j,i,h),f.rotate90cw(j,j),f.normalize(j,j),this.axes.push(j)}if(this.centerOfMass=f.fromValues(0,0),this.triangles=[],this.vertices.length&&(this.updateTriangles(),this.updateCenterOfMass()),this.boundingRadius=0,a.type=e.CONVEX,e.call(this,a),this.updateBoundingRadius(),this.updateArea(),this.area<0)throw new Error("Convex vertices must be given in conter-clockwise winding.")}var e=a("./Shape"),f=a("../math/vec2"),g=a("../math/polyk");a("poly-decomp");b.exports=d,d.prototype=new e,d.prototype.constructor=d;var h=f.create(),i=f.create();d.prototype.projectOntoLocalAxis=function(a,b){for(var c,d,e=null,g=null,a=h,i=0;i<this.vertices.length;i++)c=this.vertices[i],d=f.dot(c,a),(null===e||d>e)&&(e=d),(null===g||d<g)&&(g=d);if(g>e){var j=g;g=e,e=j}f.set(b,g,e)},d.prototype.projectOntoWorldAxis=function(a,b,c,d){var e=i;this.projectOntoLocalAxis(a,d),0!==c?f.rotate(e,a,c):e=a;var g=f.dot(b,e);f.set(d,d[0]+g,d[1]+g)},d.prototype.updateTriangles=function(){this.triangles.length=0;for(var a=[],b=0;b<this.vertices.length;b++){var c=this.vertices[b];a.push(c[0],c[1])}for(var d=g.Triangulate(a),b=0;b<d.length;b+=3){var e=d[b],f=d[b+1],h=d[b+2];this.triangles.push([e,f,h])}};var j=f.create(),k=f.create(),l=f.create(),m=f.create(),n=f.create();f.create(),f.create(),f.create(),f.create();d.prototype.updateCenterOfMass=function(){var a=this.triangles,b=this.vertices,c=this.centerOfMass,e=j,g=l,h=m,i=n,o=k;f.set(c,0,0);for(var p=0,q=0;q!==a.length;q++){var r=a[q],g=b[r[0]],h=b[r[1]],i=b[r[2]];f.centroid(e,g,h,i);var s=d.triangleArea(g,h,i);p+=s,f.scale(o,e,s),f.add(c,c,o)}f.scale(c,c,1/p)},d.prototype.computeMomentOfInertia=function(a){for(var b=0,c=0,d=this.vertices.length,e=d-1,g=0;g<d;e=g,g++){var h=this.vertices[e],i=this.vertices[g],j=Math.abs(f.crossLength(h,i)),k=f.dot(i,i)+f.dot(i,h)+f.dot(h,h);b+=j*k,c+=j}return a/6*(b/c)},d.prototype.updateBoundingRadius=function(){for(var a=this.vertices,b=0,c=0;c!==a.length;c++){var d=f.squaredLength(a[c]);d>b&&(b=d)}this.boundingRadius=Math.sqrt(b)},d.triangleArea=function(a,b,c){return.5*((b[0]-a[0])*(c[1]-a[1])-(c[0]-a[0])*(b[1]-a[1]))},d.prototype.updateArea=function(){this.updateTriangles(),this.area=0;for(var a=this.triangles,b=this.vertices,c=0;c!==a.length;c++){var e=a[c],f=b[e[0]],g=b[e[1]],h=b[e[2]],i=d.triangleArea(f,g,h);this.area+=i}},d.prototype.computeAABB=function(a,b,c){a.setFromPoints(this.vertices,b,c,0)};var o=f.create(),p=f.create(),q=f.create();d.prototype.raycast=function(a,b,c,d){var e=o,g=p,h=q,i=this.vertices;f.toLocalFrame(e,b.from,c,d),f.toLocalFrame(g,b.to,c,d);for(var j=i.length,k=0;k<j&&!a.shouldStop(b);k++){var l=i[k],m=i[(k+1)%j],n=f.getLineSegmentsIntersectionFraction(e,g,l,m);n>=0&&(f.sub(h,m,l),f.rotate(h,h,-Math.PI/2+d),f.normalize(h,h),b.reportIntersection(a,n,h,k))}}},{"../math/polyk":29,"../math/vec2":30,"./Shape":45,"poly-decomp":5}],41:[function(a,b,c){function d(a){if(Array.isArray(arguments[0])){if(a={heights:arguments[0]},"object"==typeof arguments[1])for(var b in arguments[1])a[b]=arguments[1][b];console.warn("The Heightfield constructor signature has changed. Please use the following format: new Heightfield({ heights: [...], ... })")}a=a||{},this.heights=a.heights?a.heights.slice(0):[],this.maxValue=a.maxValue||null,this.minValue=a.minValue||null,this.elementWidth=a.elementWidth||.1,void 0!==a.maxValue&&void 0!==a.minValue||this.updateMaxMinValues(),a.type=e.HEIGHTFIELD,e.call(this,a)}var e=a("./Shape"),f=a("../math/vec2");a("../utils/Utils");b.exports=d,d.prototype=new e,d.prototype.constructor=d,d.prototype.updateMaxMinValues=function(){for(var a=this.heights,b=a[0],c=a[0],d=0;d!==a.length;d++){var e=a[d];e>b&&(b=e),e<c&&(c=e)}this.maxValue=b,this.minValue=c},d.prototype.computeMomentOfInertia=function(a){return Number.MAX_VALUE},d.prototype.updateBoundingRadius=function(){this.boundingRadius=Number.MAX_VALUE},d.prototype.updateArea=function(){for(var a=this.heights,b=0,c=0;c<a.length-1;c++)b+=(a[c]+a[c+1])/2*this.elementWidth;this.area=b};var g=[f.create(),f.create(),f.create(),f.create()];d.prototype.computeAABB=function(a,b,c){f.set(g[0],0,this.maxValue),f.set(g[1],this.elementWidth*this.heights.length,this.maxValue),f.set(g[2],this.elementWidth*this.heights.length,this.minValue),f.set(g[3],0,this.minValue),a.setFromPoints(g,b,c)},d.prototype.getLineSegment=function(a,b,c){var d=this.heights,e=this.elementWidth;f.set(a,c*e,d[c]),f.set(b,(c+1)*e,d[c+1])},d.prototype.getSegmentIndex=function(a){return Math.floor(a[0]/this.elementWidth)},d.prototype.getClampedSegmentIndex=function(a){var b=this.getSegmentIndex(a);return b=Math.min(this.heights.length,Math.max(b,0))};var h=(f.create(),f.create()),i=f.create(),j=f.create(),k=f.create(),l=f.create();f.fromValues(0,1);d.prototype.raycast=function(a,b,c,d){var e=b.from,g=b.to,m=(b.direction,h),n=i,o=j,p=k,q=l;f.toLocalFrame(p,e,c,d),f.toLocalFrame(q,g,c,d);var r=this.getClampedSegmentIndex(p),s=this.getClampedSegmentIndex(q);if(r>s){var t=r;r=s,s=t}for(var u=0;u<this.heights.length-1;u++){this.getLineSegment(n,o,u);var v=f.getLineSegmentsIntersectionFraction(p,q,n,o);if(v>=0&&(f.sub(m,o,n),f.rotate(m,m,d+Math.PI/2),f.normalize(m,m),b.reportIntersection(a,v,m,-1),a.shouldStop(b)))return}}},{"../math/vec2":30,"../utils/Utils":57,"./Shape":45}],42:[function(a,b,c){function d(a){"number"==typeof arguments[0]&&(a={length:arguments[0]},console.warn("The Line constructor signature has changed. Please use the following format: new Line({ length: 1, ... })")),a=a||{},this.length=a.length||1,a.type=e.LINE,e.call(this,a)}var e=a("./Shape"),f=a("../math/vec2");b.exports=d,d.prototype=new e,d.prototype.constructor=d,d.prototype.computeMomentOfInertia=function(a){return a*Math.pow(this.length,2)/12},d.prototype.updateBoundingRadius=function(){this.boundingRadius=this.length/2};var g=[f.create(),f.create()];d.prototype.computeAABB=function(a,b,c){var d=this.length/2;f.set(g[0],-d,0),f.set(g[1],d,0),a.setFromPoints(g,b,c,0)};var h=(f.create(),f.create()),i=f.create(),j=f.create(),k=f.fromValues(0,1);d.prototype.raycast=function(a,b,c,d){var e=b.from,g=b.to,l=i,m=j,n=this.length/2;f.set(l,-n,0),f.set(m,n,0),f.toGlobalFrame(l,l,c,d),f.toGlobalFrame(m,m,c,d);var o=f.getLineSegmentsIntersectionFraction(l,m,e,g);if(o>=0){var p=h;f.rotate(p,k,d),b.reportIntersection(a,o,p,-1)}}},{"../math/vec2":30,"./Shape":45}],43:[function(a,b,c){function d(a){a=a||{},a.type=e.PARTICLE,e.call(this,a)}var e=a("./Shape"),f=a("../math/vec2");b.exports=d,d.prototype=new e,d.prototype.constructor=d,d.prototype.computeMomentOfInertia=function(a){return 0},d.prototype.updateBoundingRadius=function(){this.boundingRadius=0},d.prototype.computeAABB=function(a,b,c){f.copy(a.lowerBound,b),f.copy(a.upperBound,b)}},{"../math/vec2":30,"./Shape":45}],44:[function(a,b,c){function d(a){a=a||{},a.type=e.PLANE,e.call(this,a)}var e=a("./Shape"),f=a("../math/vec2");a("../utils/Utils");b.exports=d,d.prototype=new e,d.prototype.constructor=d,d.prototype.computeMomentOfInertia=function(a){return 0},d.prototype.updateBoundingRadius=function(){this.boundingRadius=Number.MAX_VALUE},d.prototype.computeAABB=function(a,b,c){var d=c%(2*Math.PI),e=f.set,g=Number.MAX_VALUE,h=a.lowerBound,i=a.upperBound;0===d?(e(h,-g,-g),e(i,g,0)):d===Math.PI/2?(e(h,0,-g),e(i,g,g)):d===Math.PI?(e(h,-g,0),e(i,g,g)):d===3*Math.PI/2?(e(h,-g,-g),e(i,0,g)):(e(h,-g,-g),e(i,g,g)),f.add(h,h,b),f.add(i,i,b)},d.prototype.updateArea=function(){this.area=Number.MAX_VALUE};var g=f.create(),h=(f.create(),f.create(),f.create()),i=f.create();d.prototype.raycast=function(a,b,c,d){var e=b.from,j=b.to,k=b.direction,l=g,m=h,n=i;f.set(m,0,1),f.rotate(m,m,d),f.sub(n,e,c);var o=f.dot(n,m);f.sub(n,j,c);var p=f.dot(n,m);if(!(o*p>0||f.squaredDistance(e,j)<o*o)){var q=f.dot(m,k);f.sub(l,e,c);var r=-f.dot(m,l)/q/b.length;b.reportIntersection(a,r,m,-1)}}},{"../math/vec2":30,"../utils/Utils":57,"./Shape":45}],45:[function(a,b,c){function d(a){a=a||{},this.body=null,this.position=e.fromValues(0,0),a.position&&e.copy(this.position,a.position),this.angle=a.angle||0,this.type=a.type||0,this.id=d.idCounter++,this.boundingRadius=0,this.collisionGroup=void 0!==a.collisionGroup?a.collisionGroup:1,this.collisionResponse=void 0===a.collisionResponse||a.collisionResponse,this.collisionMask=void 0!==a.collisionMask?a.collisionMask:1,this.material=a.material||null,this.area=0,this.sensor=void 0!==a.sensor&&a.sensor,this.type&&this.updateBoundingRadius(),this.updateArea()}b.exports=d;var e=a("../math/vec2");d.idCounter=0,d.CIRCLE=1,d.PARTICLE=2,d.PLANE=4,d.CONVEX=8,d.LINE=16,d.BOX=32,Object.defineProperty(d,"RECTANGLE",{get:function(){return console.warn("Shape.RECTANGLE is deprecated, use Shape.BOX instead."),d.BOX}}),d.CAPSULE=64,d.HEIGHTFIELD=128,d.prototype.computeMomentOfInertia=function(a){},d.prototype.updateBoundingRadius=function(){},d.prototype.updateArea=function(){},d.prototype.computeAABB=function(a,b,c){},d.prototype.raycast=function(a,b,c,d){}},{"../math/vec2":30}],46:[function(a,b,c){function d(a){g.call(this,a,g.GS),a=a||{},this.iterations=a.iterations||10,this.tolerance=a.tolerance||1e-7,this.arrayStep=30,this.lambda=new h.ARRAY_TYPE(this.arrayStep),this.Bs=new h.ARRAY_TYPE(this.arrayStep),this.invCs=new h.ARRAY_TYPE(this.arrayStep),this.useZeroRHS=!1,this.frictionIterations=0,this.usedIterations=0}function e(a){for(var b=a.length;b--;)a[b]=0}var f=a("../math/vec2"),g=a("./Solver"),h=a("../utils/Utils"),i=a("../equations/FrictionEquation");
b.exports=d,d.prototype=new g,d.prototype.constructor=d,d.prototype.solve=function(a,b){this.sortEquations();var c=0,g=this.iterations,j=this.frictionIterations,k=this.equations,l=k.length,m=Math.pow(this.tolerance*l,2),n=b.bodies,o=b.bodies.length,p=(f.add,f.set,this.useZeroRHS),q=this.lambda;if(this.usedIterations=0,l)for(var r=0;r!==o;r++){var s=n[r];s.updateSolveMassProperties()}q.length<l&&(q=this.lambda=new h.ARRAY_TYPE(l+this.arrayStep),this.Bs=new h.ARRAY_TYPE(l+this.arrayStep),this.invCs=new h.ARRAY_TYPE(l+this.arrayStep)),e(q);for(var t=this.invCs,u=this.Bs,q=this.lambda,r=0;r!==k.length;r++){var v=k[r];(v.timeStep!==a||v.needsUpdate)&&(v.timeStep=a,v.update()),u[r]=v.computeB(v.a,v.b,a),t[r]=v.computeInvC(v.epsilon)}var v,w,r,x;if(0!==l){for(r=0;r!==o;r++){var s=n[r];s.resetConstraintVelocity()}if(j){for(c=0;c!==j;c++){for(w=0,x=0;x!==l;x++){v=k[x];var y=d.iterateEquation(x,v,v.epsilon,u,t,q,p,a,c);w+=Math.abs(y)}if(this.usedIterations++,w*w<=m)break}for(d.updateMultipliers(k,q,1/a),x=0;x!==l;x++){var z=k[x];if(z instanceof i){for(var A=0,B=0;B!==z.contactEquations.length;B++)A+=z.contactEquations[B].multiplier;A*=z.frictionCoefficient/z.contactEquations.length,z.maxForce=A,z.minForce=-A}}}for(c=0;c!==g;c++){for(w=0,x=0;x!==l;x++){v=k[x];var y=d.iterateEquation(x,v,v.epsilon,u,t,q,p,a,c);w+=Math.abs(y)}if(this.usedIterations++,w*w<=m)break}for(r=0;r!==o;r++)n[r].addConstraintVelocity();d.updateMultipliers(k,q,1/a)}},d.updateMultipliers=function(a,b,c){for(var d=a.length;d--;)a[d].multiplier=b[d]*c},d.iterateEquation=function(a,b,c,d,e,f,g,h,i){var j=d[a],k=e[a],l=f[a],m=b.computeGWlambda(),n=b.maxForce,o=b.minForce;g&&(j=0);var p=k*(j-m-c*l),q=l+p;return q<o*h?p=o*h-l:q>n*h&&(p=n*h-l),f[a]+=p,b.addToWlambda(p),p}},{"../equations/FrictionEquation":23,"../math/vec2":30,"../utils/Utils":57,"./Solver":47}],47:[function(a,b,c){function d(a,b){a=a||{},e.call(this),this.type=b,this.equations=[],this.equationSortFunction=a.equationSortFunction||!1}var e=(a("../utils/Utils"),a("../events/EventEmitter"));b.exports=d,d.prototype=new e,d.prototype.constructor=d,d.prototype.solve=function(a,b){throw new Error("Solver.solve should be implemented by subclasses!")};var f={bodies:[]};d.prototype.solveIsland=function(a,b){this.removeAllEquations(),b.equations.length&&(this.addEquations(b.equations),f.bodies.length=0,b.getBodies(f.bodies),f.bodies.length&&this.solve(a,f))},d.prototype.sortEquations=function(){this.equationSortFunction&&this.equations.sort(this.equationSortFunction)},d.prototype.addEquation=function(a){a.enabled&&this.equations.push(a)},d.prototype.addEquations=function(a){for(var b=0,c=a.length;b!==c;b++){var d=a[b];d.enabled&&this.equations.push(d)}},d.prototype.removeEquation=function(a){var b=this.equations.indexOf(a);b!==-1&&this.equations.splice(b,1)},d.prototype.removeAllEquations=function(){this.equations.length=0},d.GS=1,d.ISLAND=2},{"../events/EventEmitter":26,"../utils/Utils":57}],48:[function(a,b,c){function d(){f.apply(this,arguments)}var e=a("../equations/ContactEquation"),f=a("./Pool");b.exports=d,d.prototype=new f,d.prototype.constructor=d,d.prototype.create=function(){return new e},d.prototype.destroy=function(a){return a.bodyA=a.bodyB=null,this}},{"../equations/ContactEquation":21,"./Pool":55}],49:[function(a,b,c){function d(){f.apply(this,arguments)}var e=a("../equations/FrictionEquation"),f=a("./Pool");b.exports=d,d.prototype=new f,d.prototype.constructor=d,d.prototype.create=function(){return new e},d.prototype.destroy=function(a){return a.bodyA=a.bodyB=null,this}},{"../equations/FrictionEquation":23,"./Pool":55}],50:[function(a,b,c){function d(){f.apply(this,arguments)}var e=a("../world/IslandNode"),f=a("./Pool");b.exports=d,d.prototype=new f,d.prototype.constructor=d,d.prototype.create=function(){return new e},d.prototype.destroy=function(a){return a.reset(),this}},{"../world/IslandNode":60,"./Pool":55}],51:[function(a,b,c){function d(){f.apply(this,arguments)}var e=a("../world/Island"),f=a("./Pool");b.exports=d,d.prototype=new f,d.prototype.constructor=d,d.prototype.create=function(){return new e},d.prototype.destroy=function(a){return a.reset(),this}},{"../world/Island":58,"./Pool":55}],52:[function(a,b,c){function d(){this.overlappingShapesLastState=new e,this.overlappingShapesCurrentState=new e,this.recordPool=new f({size:16}),this.tmpDict=new e,this.tmpArray1=[]}var e=a("./TupleDictionary"),f=(a("./OverlapKeeperRecord"),a("./OverlapKeeperRecordPool"));a("./Utils");b.exports=d,d.prototype.tick=function(){for(var a=this.overlappingShapesLastState,b=this.overlappingShapesCurrentState,c=a.keys.length;c--;){var d=a.keys[c],e=a.getByKey(d);b.getByKey(d);e&&this.recordPool.release(e)}a.reset(),a.copy(b),b.reset()},d.prototype.setOverlapping=function(a,b,c,d){var e=(this.overlappingShapesLastState,this.overlappingShapesCurrentState);if(!e.get(b.id,d.id)){var f=this.recordPool.get();f.set(a,b,c,d),e.set(b.id,d.id,f)}},d.prototype.getNewOverlaps=function(a){return this.getDiff(this.overlappingShapesLastState,this.overlappingShapesCurrentState,a)},d.prototype.getEndOverlaps=function(a){return this.getDiff(this.overlappingShapesCurrentState,this.overlappingShapesLastState,a)},d.prototype.bodiesAreOverlapping=function(a,b){for(var c=this.overlappingShapesCurrentState,d=c.keys.length;d--;){var e=c.keys[d],f=c.data[e];if(f.bodyA===a&&f.bodyB===b||f.bodyA===b&&f.bodyB===a)return!0}return!1},d.prototype.getDiff=function(a,b,c){var c=c||[],d=a,e=b;c.length=0;for(var f=e.keys.length;f--;){var g=e.keys[f],h=e.data[g];if(!h)throw new Error("Key "+g+" had no data!");var i=d.data[g];i||c.push(h)}return c},d.prototype.isNewOverlap=function(a,b){var c=0|a.id,d=0|b.id,e=this.overlappingShapesLastState,f=this.overlappingShapesCurrentState;return!e.get(c,d)&&!!f.get(c,d)},d.prototype.getNewBodyOverlaps=function(a){this.tmpArray1.length=0;var b=this.getNewOverlaps(this.tmpArray1);return this.getBodyDiff(b,a)},d.prototype.getEndBodyOverlaps=function(a){this.tmpArray1.length=0;var b=this.getEndOverlaps(this.tmpArray1);return this.getBodyDiff(b,a)},d.prototype.getBodyDiff=function(a,b){b=b||[];for(var c=this.tmpDict,d=a.length;d--;){var e=a[d];c.set(0|e.bodyA.id,0|e.bodyB.id,e)}for(d=c.keys.length;d--;){var e=c.getByKey(c.keys[d]);e&&b.push(e.bodyA,e.bodyB)}return c.reset(),b}},{"./OverlapKeeperRecord":53,"./OverlapKeeperRecordPool":54,"./TupleDictionary":56,"./Utils":57}],53:[function(a,b,c){function d(a,b,c,d){this.shapeA=b,this.shapeB=d,this.bodyA=a,this.bodyB=c}b.exports=d,d.prototype.set=function(a,b,c,e){d.call(this,a,b,c,e)}},{}],54:[function(a,b,c){function d(){f.apply(this,arguments)}var e=a("./OverlapKeeperRecord"),f=a("./Pool");b.exports=d,d.prototype=new f,d.prototype.constructor=d,d.prototype.create=function(){return new e},d.prototype.destroy=function(a){return a.bodyA=a.bodyB=a.shapeA=a.shapeB=null,this}},{"./OverlapKeeperRecord":53,"./Pool":55}],55:[function(a,b,c){function d(a){a=a||{},this.objects=[],void 0!==a.size&&this.resize(a.size)}b.exports=d,d.prototype.resize=function(a){for(var b=this.objects;b.length>a;)b.pop();for(;b.length<a;)b.push(this.create());return this},d.prototype.get=function(){var a=this.objects;return a.length?a.pop():this.create()},d.prototype.release=function(a){return this.destroy(a),this.objects.push(a),this}},{}],56:[function(a,b,c){function d(){this.data={},this.keys=[]}var e=a("./Utils");b.exports=d,d.prototype.getKey=function(a,b){return a=0|a,b=0|b,(0|a)===(0|b)?-1:0|((0|a)>(0|b)?a<<16|65535&b:b<<16|65535&a)},d.prototype.getByKey=function(a){return a=0|a,this.data[a]},d.prototype.get=function(a,b){return this.data[this.getKey(a,b)]},d.prototype.set=function(a,b,c){if(!c)throw new Error("No data!");var d=this.getKey(a,b);return this.data[d]||this.keys.push(d),this.data[d]=c,d},d.prototype.reset=function(){for(var a=this.data,b=this.keys,c=b.length;c--;)delete a[b[c]];b.length=0},d.prototype.copy=function(a){this.reset(),e.appendArray(this.keys,a.keys);for(var b=a.keys.length;b--;){var c=a.keys[b];this.data[c]=a.data[c]}}},{"./Utils":57}],57:[function(a,b,c){function d(){}b.exports=d,d.appendArray=function(a,b){if(b.length<15e4)a.push.apply(a,b);else for(var c=0,d=b.length;c!==d;++c)a.push(b[c])},d.splice=function(a,b,c){c=c||1;for(var d=b,e=a.length-c;d<e;d++)a[d]=a[d+c];a.length=e},"undefined"!=typeof P2_ARRAY_TYPE?d.ARRAY_TYPE=P2_ARRAY_TYPE:"undefined"!=typeof Float32Array?d.ARRAY_TYPE=Float32Array:d.ARRAY_TYPE=Array,d.extend=function(a,b){for(var c in b)a[c]=b[c]},d.defaults=function(a,b){a=a||{};for(var c in b)c in a||(a[c]=b[c]);return a}},{}],58:[function(a,b,c){function d(){this.equations=[],this.bodies=[]}var e=a("../objects/Body");b.exports=d,d.prototype.reset=function(){this.equations.length=this.bodies.length=0};var f=[];d.prototype.getBodies=function(a){var b=a||[],c=this.equations;f.length=0;for(var d=0;d!==c.length;d++){var e=c[d];f.indexOf(e.bodyA.id)===-1&&(b.push(e.bodyA),f.push(e.bodyA.id)),f.indexOf(e.bodyB.id)===-1&&(b.push(e.bodyB),f.push(e.bodyB.id))}return b},d.prototype.wantsToSleep=function(){for(var a=0;a<this.bodies.length;a++){var b=this.bodies[a];if(b.type===e.DYNAMIC&&!b.wantsToSleep)return!1}return!0},d.prototype.sleep=function(){for(var a=0;a<this.bodies.length;a++){var b=this.bodies[a];b.sleep()}return!0}},{"../objects/Body":31}],59:[function(a,b,c){function d(a){this.nodePool=new e({size:16}),this.islandPool=new f({size:8}),this.equations=[],this.islands=[],this.nodes=[],this.queue=[]}var e=(a("../math/vec2"),a("./Island"),a("./IslandNode"),a("./../utils/IslandNodePool")),f=a("./../utils/IslandPool"),g=a("../objects/Body");b.exports=d,d.getUnvisitedNode=function(a){for(var b=a.length,c=0;c!==b;c++){var d=a[c];if(!d.visited&&d.body.type===g.DYNAMIC)return d}return!1},d.prototype.visit=function(a,b,c){b.push(a.body);for(var d=a.equations.length,e=0;e!==d;e++){var f=a.equations[e];c.indexOf(f)===-1&&c.push(f)}},d.prototype.bfs=function(a,b,c){var e=this.queue;for(e.length=0,e.push(a),a.visited=!0,this.visit(a,b,c);e.length;)for(var f,h=e.pop();f=d.getUnvisitedNode(h.neighbors);)f.visited=!0,this.visit(f,b,c),f.body.type===g.DYNAMIC&&e.push(f)},d.prototype.split=function(a){for(var b=a.bodies,c=this.nodes,e=this.equations;c.length;)this.nodePool.release(c.pop());for(var f=0;f!==b.length;f++){var g=this.nodePool.get();g.body=b[f],c.push(g)}for(var h=0;h!==e.length;h++){var i=e[h],f=b.indexOf(i.bodyA),j=b.indexOf(i.bodyB),k=c[f],l=c[j];k.neighbors.push(l),l.neighbors.push(k),k.equations.push(i),l.equations.push(i)}for(var m=this.islands,f=0;f<m.length;f++)this.islandPool.release(m[f]);m.length=0;for(var n;n=d.getUnvisitedNode(c);){var o=this.islandPool.get();this.bfs(n,o.bodies,o.equations),m.push(o)}return m}},{"../math/vec2":30,"../objects/Body":31,"./../utils/IslandNodePool":50,"./../utils/IslandPool":51,"./Island":58,"./IslandNode":60}],60:[function(a,b,c){function d(a){this.body=a,this.neighbors=[],this.equations=[],this.visited=!1}b.exports=d,d.prototype.reset=function(){this.equations.length=0,this.neighbors.length=0,this.visited=!1,this.body=null}},{}],61:[function(a,b,c){function d(a){l.apply(this),a=a||{},this.springs=[],this.bodies=[],this.disabledBodyCollisionPairs=[],this.solver=a.solver||new e,this.narrowphase=new r(this),this.islandManager=new u,this.gravity=f.fromValues(0,-9.78),a.gravity&&f.copy(this.gravity,a.gravity),this.frictionGravity=f.length(this.gravity)||10,this.useWorldGravityAsFrictionGravity=!0,this.useFrictionGravityOnZeroGravity=!0,this.broadphase=a.broadphase||new q,this.broadphase.setWorld(this),this.constraints=[],this.defaultMaterial=new n,this.defaultContactMaterial=new o(this.defaultMaterial,this.defaultMaterial),this.lastTimeStep=1/60,this.applySpringForces=!0,this.applyDamping=!0,this.applyGravity=!0,this.solveConstraints=!0,this.contactMaterials=[],this.time=0,this.accumulator=0,this.stepping=!1,this.bodiesToBeRemoved=[],this.islandSplit="undefined"==typeof a.islandSplit||!!a.islandSplit,this.emitImpactEvent=!0,this._constraintIdCounter=0,this._bodyIdCounter=0,this.postStepEvent={type:"postStep"},this.addBodyEvent={type:"addBody",body:null},this.removeBodyEvent={type:"removeBody",body:null},this.addSpringEvent={type:"addSpring",spring:null},this.impactEvent={type:"impact",bodyA:null,bodyB:null,shapeA:null,shapeB:null,contactEquation:null},this.postBroadphaseEvent={type:"postBroadphase",pairs:null},this.sleepMode=d.NO_SLEEPING,this.beginContactEvent={type:"beginContact",shapeA:null,shapeB:null,bodyA:null,bodyB:null,contactEquations:[]},this.endContactEvent={type:"endContact",shapeA:null,shapeB:null,bodyA:null,bodyB:null},this.preSolveEvent={type:"preSolve",contactEquations:null,frictionEquations:null},this.overlappingShapesLastState={keys:[]},this.overlappingShapesCurrentState={keys:[]},this.overlapKeeper=new t}var e=a("../solver/GSSolver"),f=(a("../solver/Solver"),a("../collision/Ray"),a("../math/vec2")),g=a("../shapes/Circle"),h=a("../shapes/Convex"),i=(a("../shapes/Line"),a("../shapes/Plane")),j=a("../shapes/Capsule"),k=a("../shapes/Particle"),l=a("../events/EventEmitter"),m=a("../objects/Body"),n=(a("../shapes/Shape"),a("../objects/LinearSpring"),a("../material/Material")),o=a("../material/ContactMaterial"),p=(a("../constraints/DistanceConstraint"),a("../constraints/Constraint"),a("../constraints/LockConstraint"),a("../constraints/RevoluteConstraint"),a("../constraints/PrismaticConstraint"),a("../constraints/GearConstraint"),a("../../package.json"),a("../collision/Broadphase"),a("../collision/AABB")),q=a("../collision/SAPBroadphase"),r=a("../collision/Narrowphase"),s=a("../utils/Utils"),t=a("../utils/OverlapKeeper"),u=a("./IslandManager");a("../objects/RotationalSpring");b.exports=d,d.prototype=new Object(l.prototype),d.prototype.constructor=d,d.NO_SLEEPING=1,d.BODY_SLEEPING=2,d.ISLAND_SLEEPING=4,d.prototype.addConstraint=function(a){this.constraints.push(a)},d.prototype.addContactMaterial=function(a){this.contactMaterials.push(a)},d.prototype.removeContactMaterial=function(a){var b=this.contactMaterials.indexOf(a);b!==-1&&s.splice(this.contactMaterials,b,1)},d.prototype.getContactMaterial=function(a,b){for(var c=this.contactMaterials,d=0,e=c.length;d!==e;d++){var f=c[d];if(f.materialA.id===a.id&&f.materialB.id===b.id||f.materialA.id===b.id&&f.materialB.id===a.id)return f}return!1},d.prototype.removeConstraint=function(a){var b=this.constraints.indexOf(a);b!==-1&&s.splice(this.constraints,b,1)};var v=(f.create(),f.create(),f.create(),f.create(),f.create(),f.create(),f.create()),w=f.fromValues(0,0),x=f.fromValues(0,0);f.fromValues(0,0),f.fromValues(0,0);d.prototype.step=function(a,b,c){if(c=c||10,b=b||0,0===b)this.internalStep(a),this.time+=a;else{this.accumulator+=b;for(var d=0;this.accumulator>=a&&d<c;)this.internalStep(a),this.time+=a,this.accumulator-=a,d++;for(var e=this.accumulator%a/a,g=0;g!==this.bodies.length;g++){var h=this.bodies[g];f.lerp(h.interpolatedPosition,h.previousPosition,h.position,e),h.interpolatedAngle=h.previousAngle+e*(h.angle-h.previousAngle)}}};var y=[];d.prototype.internalStep=function(a){this.stepping=!0;var b=this.springs.length,c=this.springs,e=this.bodies,g=this.gravity,h=this.solver,i=this.bodies.length,j=this.broadphase,k=this.narrowphase,l=this.constraints,n=v,o=(f.scale,f.add),p=(f.rotate,this.islandManager);if(this.overlapKeeper.tick(),this.lastTimeStep=a,this.useWorldGravityAsFrictionGravity){var q=f.length(this.gravity);0===q&&this.useFrictionGravityOnZeroGravity||(this.frictionGravity=q)}if(this.applyGravity)for(var r=0;r!==i;r++){var t=e[r],u=t.force;t.type===m.DYNAMIC&&t.sleepState!==m.SLEEPING&&(f.scale(n,g,t.mass*t.gravityScale),o(u,u,n))}if(this.applySpringForces)for(var r=0;r!==b;r++){var w=c[r];w.applyForce()}if(this.applyDamping)for(var r=0;r!==i;r++){var t=e[r];t.type===m.DYNAMIC&&t.applyDamping(a)}for(var x=j.getCollisionPairs(this),z=this.disabledBodyCollisionPairs,r=z.length-2;r>=0;r-=2)for(var A=x.length-2;A>=0;A-=2)(z[r]===x[A]&&z[r+1]===x[A+1]||z[r+1]===x[A]&&z[r]===x[A+1])&&x.splice(A,2);var B=l.length;for(r=0;r!==B;r++){var C=l[r];if(!C.collideConnected)for(var A=x.length-2;A>=0;A-=2)(C.bodyA===x[A]&&C.bodyB===x[A+1]||C.bodyB===x[A]&&C.bodyA===x[A+1])&&x.splice(A,2)}this.postBroadphaseEvent.pairs=x,this.emit(this.postBroadphaseEvent),this.postBroadphaseEvent.pairs=null,k.reset(this);for(var r=0,D=x.length;r!==D;r+=2)for(var E=x[r],F=x[r+1],G=0,H=E.shapes.length;G!==H;G++)for(var I=E.shapes[G],J=I.position,K=I.angle,L=0,M=F.shapes.length;L!==M;L++){var N=F.shapes[L],O=N.position,P=N.angle,Q=this.defaultContactMaterial;if(I.material&&N.material){var R=this.getContactMaterial(I.material,N.material);R&&(Q=R)}this.runNarrowphase(k,E,I,J,K,F,N,O,P,Q,this.frictionGravity)}for(var r=0;r!==i;r++){var S=e[r];S._wakeUpAfterNarrowphase&&(S.wakeUp(),S._wakeUpAfterNarrowphase=!1)}if(this.has("endContact")){this.overlapKeeper.getEndOverlaps(y);for(var T=this.endContactEvent,L=y.length;L--;){var U=y[L];T.shapeA=U.shapeA,T.shapeB=U.shapeB,T.bodyA=U.bodyA,T.bodyB=U.bodyB,this.emit(T)}y.length=0}var V=this.preSolveEvent;V.contactEquations=k.contactEquations,V.frictionEquations=k.frictionEquations,this.emit(V),V.contactEquations=V.frictionEquations=null;var B=l.length;for(r=0;r!==B;r++)l[r].update();if(k.contactEquations.length||k.frictionEquations.length||B)if(this.islandSplit){for(p.equations.length=0,s.appendArray(p.equations,k.contactEquations),s.appendArray(p.equations,k.frictionEquations),r=0;r!==B;r++)s.appendArray(p.equations,l[r].equations);p.split(this);for(var r=0;r!==p.islands.length;r++){var W=p.islands[r];W.equations.length&&h.solveIsland(a,W)}}else{for(h.addEquations(k.contactEquations),h.addEquations(k.frictionEquations),r=0;r!==B;r++)h.addEquations(l[r].equations);this.solveConstraints&&h.solve(a,this),h.removeAllEquations()}for(var r=0;r!==i;r++){var S=e[r];S.integrate(a)}for(var r=0;r!==i;r++)e[r].setZeroForce();if(this.emitImpactEvent&&this.has("impact"))for(var X=this.impactEvent,r=0;r!==k.contactEquations.length;r++){var Y=k.contactEquations[r];Y.firstImpact&&(X.bodyA=Y.bodyA,X.bodyB=Y.bodyB,X.shapeA=Y.shapeA,X.shapeB=Y.shapeB,X.contactEquation=Y,this.emit(X))}if(this.sleepMode===d.BODY_SLEEPING)for(r=0;r!==i;r++)e[r].sleepTick(this.time,!1,a);else if(this.sleepMode===d.ISLAND_SLEEPING&&this.islandSplit){for(r=0;r!==i;r++)e[r].sleepTick(this.time,!0,a);for(var r=0;r<this.islandManager.islands.length;r++){var W=this.islandManager.islands[r];W.wantsToSleep()&&W.sleep()}}this.stepping=!1;for(var Z=this.bodiesToBeRemoved,r=0;r!==Z.length;r++)this.removeBody(Z[r]);Z.length=0,this.emit(this.postStepEvent)},d.prototype.runNarrowphase=function(a,b,c,d,e,g,h,i,j,k,l){if(0!==(c.collisionGroup&h.collisionMask)&&0!==(h.collisionGroup&c.collisionMask)){f.rotate(w,d,b.angle),f.rotate(x,i,g.angle),f.add(w,w,b.position),f.add(x,x,g.position);var n=e+b.angle,o=j+g.angle;a.enableFriction=k.friction>0,a.frictionCoefficient=k.friction;var p;p=b.type===m.STATIC||b.type===m.KINEMATIC?g.mass:g.type===m.STATIC||g.type===m.KINEMATIC?b.mass:b.mass*g.mass/(b.mass+g.mass),a.slipForce=k.friction*l*p,a.restitution=k.restitution,a.surfaceVelocity=k.surfaceVelocity,a.frictionStiffness=k.frictionStiffness,a.frictionRelaxation=k.frictionRelaxation,a.stiffness=k.stiffness,a.relaxation=k.relaxation,a.contactSkinSize=k.contactSkinSize,a.enabledEquations=b.collisionResponse&&g.collisionResponse&&c.collisionResponse&&h.collisionResponse;var q=a[c.type|h.type],r=0;if(q){var s=c.sensor||h.sensor,t=a.frictionEquations.length;r=c.type<h.type?q.call(a,b,c,w,n,g,h,x,o,s):q.call(a,g,h,x,o,b,c,w,n,s);var u=a.frictionEquations.length-t;if(r){if(b.allowSleep&&b.type===m.DYNAMIC&&b.sleepState===m.SLEEPING&&g.sleepState===m.AWAKE&&g.type!==m.STATIC){var v=f.squaredLength(g.velocity)+Math.pow(g.angularVelocity,2),y=Math.pow(g.sleepSpeedLimit,2);v>=2*y&&(b._wakeUpAfterNarrowphase=!0)}if(g.allowSleep&&g.type===m.DYNAMIC&&g.sleepState===m.SLEEPING&&b.sleepState===m.AWAKE&&b.type!==m.STATIC){var z=f.squaredLength(b.velocity)+Math.pow(b.angularVelocity,2),A=Math.pow(b.sleepSpeedLimit,2);z>=2*A&&(g._wakeUpAfterNarrowphase=!0)}if(this.overlapKeeper.setOverlapping(b,c,g,h),this.has("beginContact")&&this.overlapKeeper.isNewOverlap(c,h)){var B=this.beginContactEvent;if(B.shapeA=c,B.shapeB=h,B.bodyA=b,B.bodyB=g,B.contactEquations.length=0,"number"==typeof r)for(var C=a.contactEquations.length-r;C<a.contactEquations.length;C++)B.contactEquations.push(a.contactEquations[C]);this.emit(B)}if("number"==typeof r&&u>1)for(var C=a.frictionEquations.length-u;C<a.frictionEquations.length;C++){var D=a.frictionEquations[C];D.setSlipForce(D.getSlipForce()/u)}}}}},d.prototype.addSpring=function(a){this.springs.push(a);var b=this.addSpringEvent;b.spring=a,this.emit(b),b.spring=null},d.prototype.removeSpring=function(a){var b=this.springs.indexOf(a);b!==-1&&s.splice(this.springs,b,1)},d.prototype.addBody=function(a){if(this.bodies.indexOf(a)===-1){this.bodies.push(a),a.world=this;var b=this.addBodyEvent;b.body=a,this.emit(b),b.body=null}},d.prototype.removeBody=function(a){if(this.stepping)this.bodiesToBeRemoved.push(a);else{a.world=null;var b=this.bodies.indexOf(a);b!==-1&&(s.splice(this.bodies,b,1),this.removeBodyEvent.body=a,a.resetConstraintVelocity(),this.emit(this.removeBodyEvent),this.removeBodyEvent.body=null)}},d.prototype.getBodyById=function(a){for(var b=this.bodies,c=0;c<b.length;c++){var d=b[c];if(d.id===a)return d}return!1},d.prototype.disableBodyCollision=function(a,b){this.disabledBodyCollisionPairs.push(a,b)},d.prototype.enableBodyCollision=function(a,b){for(var c=this.disabledBodyCollisionPairs,d=0;d<c.length;d+=2)if(c[d]===a&&c[d+1]===b||c[d+1]===a&&c[d]===b)return void c.splice(d,2)},d.prototype.clear=function(){this.time=0,this.solver&&this.solver.equations.length&&this.solver.removeAllEquations();for(var a=this.constraints,b=a.length-1;b>=0;b--)this.removeConstraint(a[b]);for(var c=this.bodies,b=c.length-1;b>=0;b--)this.removeBody(c[b]);for(var e=this.springs,b=e.length-1;b>=0;b--)this.removeSpring(e[b]);for(var f=this.contactMaterials,b=f.length-1;b>=0;b--)this.removeContactMaterial(f[b]);d.apply(this)};var z=f.create(),A=(f.fromValues(0,0),f.fromValues(0,0));d.prototype.hitTest=function(a,b,c){c=c||0;var d=new m({position:a}),e=new k,l=a,n=0,o=z,p=A;d.addShape(e);for(var q=this.narrowphase,r=[],s=0,t=b.length;s!==t;s++)for(var u=b[s],v=0,w=u.shapes.length;v!==w;v++){var x=u.shapes[v];f.rotate(o,x.position,u.angle),f.add(o,o,u.position);var y=x.angle+u.angle;(x instanceof g&&q.circleParticle(u,x,o,y,d,e,l,n,!0)||x instanceof h&&q.particleConvex(d,e,l,n,u,x,o,y,!0)||x instanceof i&&q.particlePlane(d,e,l,n,u,x,o,y,!0)||x instanceof j&&q.particleCapsule(d,e,l,n,u,x,o,y,!0)||x instanceof k&&f.squaredLength(f.sub(p,o,a))<c*c)&&r.push(u)}return r},d.prototype.setGlobalStiffness=function(a){for(var b=this.constraints,c=0;c!==b.length;c++)for(var d=b[c],e=0;e!==d.equations.length;e++){var f=d.equations[e];f.stiffness=a,f.needsUpdate=!0}for(var g=this.contactMaterials,c=0;c!==g.length;c++){var d=g[c];d.stiffness=d.frictionStiffness=a}var d=this.defaultContactMaterial;d.stiffness=d.frictionStiffness=a},d.prototype.setGlobalRelaxation=function(a){for(var b=0;b!==this.constraints.length;b++)for(var c=this.constraints[b],d=0;d!==c.equations.length;d++){var e=c.equations[d];e.relaxation=a,e.needsUpdate=!0}for(var b=0;b!==this.contactMaterials.length;b++){var c=this.contactMaterials[b];c.relaxation=c.frictionRelaxation=a}var c=this.defaultContactMaterial;c.relaxation=c.frictionRelaxation=a};var B=new p,C=[];d.prototype.raycast=function(a,b){return b.getAABB(B),this.broadphase.aabbQuery(this,B,C),b.intersectBodies(a,C),C.length=0,a.hasHit()}},{"../../package.json":6,"../collision/AABB":7,"../collision/Broadphase":8,"../collision/Narrowphase":10,"../collision/Ray":11,"../collision/SAPBroadphase":13,"../constraints/Constraint":14,"../constraints/DistanceConstraint":15,"../constraints/GearConstraint":16,"../constraints/LockConstraint":17,"../constraints/PrismaticConstraint":18,"../constraints/RevoluteConstraint":19,"../events/EventEmitter":26,"../material/ContactMaterial":27,"../material/Material":28,"../math/vec2":30,"../objects/Body":31,"../objects/LinearSpring":32,"../objects/RotationalSpring":33,"../shapes/Capsule":38,"../shapes/Circle":39,"../shapes/Convex":40,"../shapes/Line":42,"../shapes/Particle":43,"../shapes/Plane":44,"../shapes/Shape":45,"../solver/GSSolver":46,"../solver/Solver":47,"../utils/OverlapKeeper":52,"../utils/Utils":57,"./IslandManager":59}]},{},[36])(36)});
//# sourceMappingURL=p2.map
/* Phaser v2.6.2 PIXI Build - http://phaser.io - @photonstorm - (c) 2016 Photon Storm Ltd. */

(function(){var a=this,b=b||{};return b.game=null,b.WEBGL_RENDERER=0,b.CANVAS_RENDERER=1,b.VERSION="v2.2.9",b._UID=0,"undefined"!=typeof Float32Array?(b.Float32Array=Float32Array,b.Uint16Array=Uint16Array,b.Uint32Array=Uint32Array,b.ArrayBuffer=ArrayBuffer):(b.Float32Array=Array,b.Uint16Array=Array),b.PI_2=2*Math.PI,b.RAD_TO_DEG=180/Math.PI,b.DEG_TO_RAD=Math.PI/180,b.RETINA_PREFIX="@2x",b.DisplayObject=function(){this.position=new b.Point(0,0),this.scale=new b.Point(1,1),this.pivot=new b.Point(0,0),this.rotation=0,this.alpha=1,this.visible=!0,this.hitArea=null,this.renderable=!1,this.parent=null,this.worldAlpha=1,this.worldTransform=new b.Matrix,this.worldPosition=new b.Point(0,0),this.worldScale=new b.Point(1,1),this.worldRotation=0,this.filterArea=null,this._sr=0,this._cr=1,this._bounds=new b.Rectangle(0,0,0,0),this._currentBounds=null,this._mask=null,this._cacheAsBitmap=!1,this._cacheIsDirty=!1},b.DisplayObject.prototype.constructor=b.DisplayObject,b.DisplayObject.prototype={destroy:function(){if(this.children){for(var a=this.children.length;a--;)this.children[a].destroy();this.children=[]}this.hitArea=null,this.parent=null,this.worldTransform=null,this.filterArea=null,this.renderable=!1,this._bounds=null,this._currentBounds=null,this._mask=null,this._destroyCachedSprite()},updateTransform:function(a){if(!a&&!this.parent&&!this.game)return this;var c=this.parent;a?c=a:this.parent||(c=this.game.world);var d,e,f,g,h,i,j=c.worldTransform,k=this.worldTransform;return this.rotation%b.PI_2?(this.rotation!==this.rotationCache&&(this.rotationCache=this.rotation,this._sr=Math.sin(this.rotation),this._cr=Math.cos(this.rotation)),d=this._cr*this.scale.x,e=this._sr*this.scale.x,f=-this._sr*this.scale.y,g=this._cr*this.scale.y,h=this.position.x,i=this.position.y,(this.pivot.x||this.pivot.y)&&(h-=this.pivot.x*d+this.pivot.y*f,i-=this.pivot.x*e+this.pivot.y*g),k.a=d*j.a+e*j.c,k.b=d*j.b+e*j.d,k.c=f*j.a+g*j.c,k.d=f*j.b+g*j.d,k.tx=h*j.a+i*j.c+j.tx,k.ty=h*j.b+i*j.d+j.ty):(d=this.scale.x,g=this.scale.y,h=this.position.x-this.pivot.x*d,i=this.position.y-this.pivot.y*g,k.a=d*j.a,k.b=d*j.b,k.c=g*j.c,k.d=g*j.d,k.tx=h*j.a+i*j.c+j.tx,k.ty=h*j.b+i*j.d+j.ty),this.worldAlpha=this.alpha*c.worldAlpha,this.worldPosition.set(k.tx,k.ty),this.worldScale.set(this.scale.x*Math.sqrt(k.a*k.a+k.c*k.c),this.scale.y*Math.sqrt(k.b*k.b+k.d*k.d)),this.worldRotation=Math.atan2(-k.c,k.d),this._currentBounds=null,this.transformCallback&&this.transformCallback.call(this.transformCallbackContext,k,j),this},preUpdate:function(){},generateTexture:function(a,c,d){var e=this.getLocalBounds(),f=new b.RenderTexture(0|e.width,0|e.height,d,c,a);return b.DisplayObject._tempMatrix.tx=-e.x,b.DisplayObject._tempMatrix.ty=-e.y,f.render(this,b.DisplayObject._tempMatrix),f},updateCache:function(){return this._generateCachedSprite(),this},toGlobal:function(a){return this.updateTransform(),this.worldTransform.apply(a)},toLocal:function(a,b){return b&&(a=b.toGlobal(a)),this.updateTransform(),this.worldTransform.applyInverse(a)},_renderCachedSprite:function(a){this._cachedSprite.worldAlpha=this.worldAlpha,a.gl?b.Sprite.prototype._renderWebGL.call(this._cachedSprite,a):b.Sprite.prototype._renderCanvas.call(this._cachedSprite,a)},_generateCachedSprite:function(){this._cacheAsBitmap=!1;var a=this.getLocalBounds();if(a.width=Math.max(1,Math.ceil(a.width)),a.height=Math.max(1,Math.ceil(a.height)),this.updateTransform(),this._cachedSprite)this._cachedSprite.texture.resize(a.width,a.height);else{var c=new b.RenderTexture(a.width,a.height);this._cachedSprite=new b.Sprite(c),this._cachedSprite.worldTransform=this.worldTransform}var d=this._filters;this._filters=null,this._cachedSprite.filters=d,b.DisplayObject._tempMatrix.tx=-a.x,b.DisplayObject._tempMatrix.ty=-a.y,this._cachedSprite.texture.render(this,b.DisplayObject._tempMatrix,!0),this._cachedSprite.anchor.x=-(a.x/a.width),this._cachedSprite.anchor.y=-(a.y/a.height),this._filters=d,this._cacheAsBitmap=!0},_destroyCachedSprite:function(){this._cachedSprite&&(this._cachedSprite.texture.destroy(!0),this._cachedSprite=null)}},b.DisplayObject.prototype.displayObjectUpdateTransform=b.DisplayObject.prototype.updateTransform,Object.defineProperties(b.DisplayObject.prototype,{x:{get:function(){return this.position.x},set:function(a){this.position.x=a}},y:{get:function(){return this.position.y},set:function(a){this.position.y=a}},worldVisible:{get:function(){if(this.visible){var a=this.parent;if(!a)return this.visible;do{if(!a.visible)return!1;a=a.parent}while(a);return!0}return!1}},mask:{get:function(){return this._mask},set:function(a){this._mask&&(this._mask.isMask=!1),this._mask=a,a&&(this._mask.isMask=!0)}},filters:{get:function(){return this._filters},set:function(a){if(Array.isArray(a)){for(var c=[],d=0;d<a.length;d++)for(var e=a[d].passes,f=0;f<e.length;f++)c.push(e[f]);this._filterBlock={target:this,filterPasses:c}}this._filters=a,this.blendMode&&this.blendMode===b.blendModes.MULTIPLY&&(this.blendMode=b.blendModes.NORMAL)}},cacheAsBitmap:{get:function(){return this._cacheAsBitmap},set:function(a){this._cacheAsBitmap!==a&&(a?this._generateCachedSprite():this._destroyCachedSprite(),this._cacheAsBitmap=a)}}}),b.DisplayObjectContainer=function(){b.DisplayObject.call(this),this.children=[],this.ignoreChildInput=!1},b.DisplayObjectContainer.prototype=Object.create(b.DisplayObject.prototype),b.DisplayObjectContainer.prototype.constructor=b.DisplayObjectContainer,b.DisplayObjectContainer.prototype.addChild=function(a){return this.addChildAt(a,this.children.length)},b.DisplayObjectContainer.prototype.addChildAt=function(a,b){if(b>=0&&b<=this.children.length)return a.parent&&a.parent.removeChild(a),a.parent=this,this.children.splice(b,0,a),a;throw new Error(a+"addChildAt: The index "+b+" supplied is out of bounds "+this.children.length)},b.DisplayObjectContainer.prototype.swapChildren=function(a,b){if(a!==b){var c=this.getChildIndex(a),d=this.getChildIndex(b);if(c<0||d<0)throw new Error("swapChildren: Both the supplied DisplayObjects must be a child of the caller.");this.children[c]=b,this.children[d]=a}},b.DisplayObjectContainer.prototype.getChildIndex=function(a){var b=this.children.indexOf(a);if(b===-1)throw new Error("The supplied DisplayObject must be a child of the caller");return b},b.DisplayObjectContainer.prototype.setChildIndex=function(a,b){if(b<0||b>=this.children.length)throw new Error("The supplied index is out of bounds");var c=this.getChildIndex(a);this.children.splice(c,1),this.children.splice(b,0,a)},b.DisplayObjectContainer.prototype.getChildAt=function(a){if(a<0||a>=this.children.length)throw new Error("getChildAt: Supplied index "+a+" does not exist in the child list, or the supplied DisplayObject must be a child of the caller");return this.children[a]},b.DisplayObjectContainer.prototype.removeChild=function(a){var b=this.children.indexOf(a);if(b!==-1)return this.removeChildAt(b)},b.DisplayObjectContainer.prototype.removeChildAt=function(a){var b=this.getChildAt(a);return b&&(b.parent=void 0,this.children.splice(a,1)),b},b.DisplayObjectContainer.prototype.removeChildren=function(a,b){void 0===a&&(a=0),void 0===b&&(b=this.children.length);var c=b-a;if(c>0&&c<=b){for(var d=this.children.splice(begin,c),e=0;e<d.length;e++){var f=d[e];f.parent=void 0}return d}if(0===c&&0===this.children.length)return[];throw new Error("removeChildren: Range Error, numeric values are outside the acceptable range")},b.DisplayObjectContainer.prototype.updateTransform=function(){if(this.visible&&(this.displayObjectUpdateTransform(),!this._cacheAsBitmap))for(var a=0;a<this.children.length;a++)this.children[a].updateTransform()},b.DisplayObjectContainer.prototype.displayObjectContainerUpdateTransform=b.DisplayObjectContainer.prototype.updateTransform,b.DisplayObjectContainer.prototype.getBounds=function(a){var c=a&&a instanceof b.DisplayObject,d=!0;c?d=a instanceof b.DisplayObjectContainer&&a.contains(this):a=this;var e;if(c){var f=a.worldTransform;for(a.worldTransform=b.identityMatrix,e=0;e<a.children.length;e++)a.children[e].updateTransform()}var g,h,i,j=1/0,k=1/0,l=-(1/0),m=-(1/0),n=!1;for(e=0;e<this.children.length;e++){var o=this.children[e];o.visible&&(n=!0,g=this.children[e].getBounds(),j=j<g.x?j:g.x,k=k<g.y?k:g.y,h=g.width+g.x,i=g.height+g.y,l=l>h?l:h,m=m>i?m:i)}var p=this._bounds;if(!n){p=new b.Rectangle;var q=p.x,r=p.width+p.x,s=p.y,t=p.height+p.y,u=this.worldTransform,v=u.a,w=u.b,x=u.c,y=u.d,z=u.tx,A=u.ty,B=v*r+x*t+z,C=y*t+w*r+A,D=v*q+x*t+z,E=y*t+w*q+A,F=v*q+x*s+z,G=y*s+w*q+A,H=v*r+x*s+z,I=y*s+w*r+A;l=B,m=C,j=B,k=C,j=D<j?D:j,j=F<j?F:j,j=H<j?H:j,k=E<k?E:k,k=G<k?G:k,k=I<k?I:k,l=D>l?D:l,l=F>l?F:l,l=H>l?H:l,m=E>m?E:m,m=G>m?G:m,m=I>m?I:m}if(p.x=j,p.y=k,p.width=l-j,p.height=m-k,c)for(a.worldTransform=f,e=0;e<a.children.length;e++)a.children[e].updateTransform();if(!d){var J=a.getBounds();p.x-=J.x,p.y-=J.y}return p},b.DisplayObjectContainer.prototype.getLocalBounds=function(){return this.getBounds(this)},b.DisplayObjectContainer.prototype.contains=function(a){return!!a&&(a===this||this.contains(a.parent))},b.DisplayObjectContainer.prototype._renderWebGL=function(a){if(this.visible&&!(this.alpha<=0)){if(this._cacheAsBitmap)return void this._renderCachedSprite(a);var b;if(this._mask||this._filters){for(this._filters&&(a.spriteBatch.flush(),a.filterManager.pushFilter(this._filterBlock)),this._mask&&(a.spriteBatch.stop(),a.maskManager.pushMask(this.mask,a),a.spriteBatch.start()),b=0;b<this.children.length;b++)this.children[b]._renderWebGL(a);a.spriteBatch.stop(),this._mask&&a.maskManager.popMask(this._mask,a),this._filters&&a.filterManager.popFilter(),a.spriteBatch.start()}else for(b=0;b<this.children.length;b++)this.children[b]._renderWebGL(a)}},b.DisplayObjectContainer.prototype._renderCanvas=function(a){if(this.visible!==!1&&0!==this.alpha){if(this._cacheAsBitmap)return void this._renderCachedSprite(a);this._mask&&a.maskManager.pushMask(this._mask,a);for(var b=0;b<this.children.length;b++)this.children[b]._renderCanvas(a);this._mask&&a.maskManager.popMask(a)}},Object.defineProperty(b.DisplayObjectContainer.prototype,"width",{get:function(){return this.getLocalBounds().width*this.scale.x},set:function(a){var b=this.getLocalBounds().width;0!==b?this.scale.x=a/b:this.scale.x=1,this._width=a}}),Object.defineProperty(b.DisplayObjectContainer.prototype,"height",{get:function(){return this.getLocalBounds().height*this.scale.y},set:function(a){var b=this.getLocalBounds().height;0!==b?this.scale.y=a/b:this.scale.y=1,this._height=a}}),b.Sprite=function(a){b.DisplayObjectContainer.call(this),this.anchor=new b.Point,this.texture=a||b.Texture.emptyTexture,this._width=0,this._height=0,this.tint=16777215,this.cachedTint=-1,this.tintedTexture=null,this.blendMode=b.blendModes.NORMAL,this.shader=null,this.exists=!0,this.texture.baseTexture.hasLoaded&&this.onTextureUpdate(),this.renderable=!0},b.Sprite.prototype=Object.create(b.DisplayObjectContainer.prototype),b.Sprite.prototype.constructor=b.Sprite,Object.defineProperty(b.Sprite.prototype,"width",{get:function(){return this.scale.x*this.texture.frame.width},set:function(a){this.scale.x=a/this.texture.frame.width,this._width=a}}),Object.defineProperty(b.Sprite.prototype,"height",{get:function(){return this.scale.y*this.texture.frame.height},set:function(a){this.scale.y=a/this.texture.frame.height,this._height=a}}),b.Sprite.prototype.setTexture=function(a,b){void 0!==b&&this.texture.baseTexture.destroy(),this.texture.baseTexture.skipRender=!1,this.texture=a,this.texture.valid=!0,this.cachedTint=-1},b.Sprite.prototype.onTextureUpdate=function(){this._width&&(this.scale.x=this._width/this.texture.frame.width),this._height&&(this.scale.y=this._height/this.texture.frame.height)},b.Sprite.prototype.getBounds=function(a){var b=this.texture.frame.width,c=this.texture.frame.height,d=b*(1-this.anchor.x),e=b*-this.anchor.x,f=c*(1-this.anchor.y),g=c*-this.anchor.y,h=a||this.worldTransform,i=h.a,j=h.b,k=h.c,l=h.d,m=h.tx,n=h.ty,o=-(1/0),p=-(1/0),q=1/0,r=1/0;if(0===j&&0===k){if(i<0){i*=-1;var s=d;d=-e,e=-s}if(l<0){l*=-1;var s=f;f=-g,g=-s}q=i*e+m,o=i*d+m,r=l*g+n,p=l*f+n}else{var t=i*e+k*g+m,u=l*g+j*e+n,v=i*d+k*g+m,w=l*g+j*d+n,x=i*d+k*f+m,y=l*f+j*d+n,z=i*e+k*f+m,A=l*f+j*e+n;q=t<q?t:q,q=v<q?v:q,q=x<q?x:q,q=z<q?z:q,r=u<r?u:r,r=w<r?w:r,r=y<r?y:r,r=A<r?A:r,o=t>o?t:o,o=v>o?v:o,o=x>o?x:o,o=z>o?z:o,p=u>p?u:p,p=w>p?w:p,p=y>p?y:p,p=A>p?A:p}var B=this._bounds;return B.x=q,B.width=o-q,B.y=r,B.height=p-r,this._currentBounds=B,B},b.Sprite.prototype.getLocalBounds=function(){var a=this.worldTransform;this.worldTransform=b.identityMatrix;for(var c=0;c<this.children.length;c++)this.children[c].updateTransform();var d=this.getBounds();for(this.worldTransform=a,c=0;c<this.children.length;c++)this.children[c].updateTransform();return d},b.Sprite.prototype._renderWebGL=function(a,b){if(this.visible&&!(this.alpha<=0)&&this.renderable){var c=this.worldTransform;if(b&&(c=b),this._mask||this._filters){var d=a.spriteBatch;this._filters&&(d.flush(),a.filterManager.pushFilter(this._filterBlock)),this._mask&&(d.stop(),a.maskManager.pushMask(this.mask,a),d.start()),d.render(this);for(var e=0;e<this.children.length;e++)this.children[e]._renderWebGL(a);d.stop(),this._mask&&a.maskManager.popMask(this._mask,a),this._filters&&a.filterManager.popFilter(),d.start()}else{a.spriteBatch.render(this);for(var e=0;e<this.children.length;e++)this.children[e]._renderWebGL(a,c)}}},b.Sprite.prototype._renderCanvas=function(a,c){if(!(!this.visible||0===this.alpha||!this.renderable||this.texture.crop.width<=0||this.texture.crop.height<=0)){var d=this.worldTransform;if(c&&(d=c),this.blendMode!==a.currentBlendMode&&(a.currentBlendMode=this.blendMode,a.context.globalCompositeOperation=b.blendModesCanvas[a.currentBlendMode]),this._mask&&a.maskManager.pushMask(this._mask,a),this.texture.valid){var e=this.texture.baseTexture.resolution/a.resolution;a.context.globalAlpha=this.worldAlpha,a.smoothProperty&&a.scaleMode!==this.texture.baseTexture.scaleMode&&(a.scaleMode=this.texture.baseTexture.scaleMode,a.context[a.smoothProperty]=a.scaleMode===b.scaleModes.LINEAR);var f=this.texture.trim?this.texture.trim.x-this.anchor.x*this.texture.trim.width:this.anchor.x*-this.texture.frame.width,g=this.texture.trim?this.texture.trim.y-this.anchor.y*this.texture.trim.height:this.anchor.y*-this.texture.frame.height,h=d.tx*a.resolution+a.shakeX,i=d.ty*a.resolution+a.shakeY;a.roundPixels?(a.context.setTransform(d.a,d.b,d.c,d.d,0|h,0|i),f|=0,g|=0):a.context.setTransform(d.a,d.b,d.c,d.d,h,i);var j=this.texture.crop.width,k=this.texture.crop.height;if(f/=e,g/=e,16777215!==this.tint)(this.texture.requiresReTint||this.cachedTint!==this.tint)&&(this.tintedTexture=b.CanvasTinter.getTintedTexture(this,this.tint),this.cachedTint=this.tint,this.texture.requiresReTint=!1),a.context.drawImage(this.tintedTexture,0,0,j,k,f,g,j/e,k/e);else{var l=this.texture.crop.x,m=this.texture.crop.y;a.context.drawImage(this.texture.baseTexture.source,l,m,j,k,f,g,j/e,k/e)}}for(var n=0;n<this.children.length;n++)this.children[n]._renderCanvas(a);this._mask&&a.maskManager.popMask(a)}},b.SpriteBatch=function(a){b.DisplayObjectContainer.call(this),this.textureThing=a,this.ready=!1},b.SpriteBatch.prototype=Object.create(b.DisplayObjectContainer.prototype),b.SpriteBatch.prototype.constructor=b.SpriteBatch,b.SpriteBatch.prototype.initWebGL=function(a){this.fastSpriteBatch=new b.WebGLFastSpriteBatch(a),this.ready=!0},b.SpriteBatch.prototype.updateTransform=function(){this.displayObjectUpdateTransform()},b.SpriteBatch.prototype._renderWebGL=function(a){!this.visible||this.alpha<=0||!this.children.length||(this.ready||this.initWebGL(a.gl),this.fastSpriteBatch.gl!==a.gl&&this.fastSpriteBatch.setContext(a.gl),a.spriteBatch.stop(),a.shaderManager.setShader(a.shaderManager.fastShader),this.fastSpriteBatch.begin(this,a),this.fastSpriteBatch.render(this),a.spriteBatch.start())},b.SpriteBatch.prototype._renderCanvas=function(a){if(this.visible&&!(this.alpha<=0)&&this.children.length){var b=a.context;b.globalAlpha=this.worldAlpha,this.displayObjectUpdateTransform();for(var c=this.worldTransform,d=!0,e=0;e<this.children.length;e++){var f=this.children[e];if(f.visible){var g=f.texture,h=g.frame;if(b.globalAlpha=this.worldAlpha*f.alpha,f.rotation%(2*Math.PI)===0)d&&(b.setTransform(c.a,c.b,c.c,c.d,c.tx,c.ty),d=!1),b.drawImage(g.baseTexture.source,h.x,h.y,h.width,h.height,f.anchor.x*(-h.width*f.scale.x)+f.position.x+.5+a.shakeX|0,f.anchor.y*(-h.height*f.scale.y)+f.position.y+.5+a.shakeY|0,h.width*f.scale.x,h.height*f.scale.y);else{d||(d=!0),f.displayObjectUpdateTransform();var i=f.worldTransform,j=i.tx*a.resolution+a.shakeX,k=i.ty*a.resolution+a.shakeY;a.roundPixels?b.setTransform(i.a,i.b,i.c,i.d,0|j,0|k):b.setTransform(i.a,i.b,i.c,i.d,j,k),b.drawImage(g.baseTexture.source,h.x,h.y,h.width,h.height,f.anchor.x*-h.width+.5|0,f.anchor.y*-h.height+.5|0,h.width,h.height)}}}}},b.hex2rgb=function(a){return[(a>>16&255)/255,(a>>8&255)/255,(255&a)/255]},b.rgb2hex=function(a){return(255*a[0]<<16)+(255*a[1]<<8)+255*a[2]},b.canUseNewCanvasBlendModes=function(){if(void 0===document)return!1;var a="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAABAQMAAADD8p2OAAAAA1BMVEX/",c="AAAACklEQVQI12NgAAAAAgAB4iG8MwAAAABJRU5ErkJggg==",d=new Image;d.src=a+"AP804Oa6"+c;var e=new Image;e.src=a+"/wCKxvRF"+c;var f=b.CanvasPool.create(this,6,1),g=f.getContext("2d");if(g.globalCompositeOperation="multiply",g.drawImage(d,0,0),g.drawImage(e,2,0),!g.getImageData(2,0,1,1))return!1;var h=g.getImageData(2,0,1,1).data;return b.CanvasPool.remove(this),255===h[0]&&0===h[1]&&0===h[2]},b.getNextPowerOfTwo=function(a){if(a>0&&0===(a&a-1))return a;for(var b=1;b<a;)b<<=1;return b},b.isPowerOfTwo=function(a,b){return a>0&&0===(a&a-1)&&b>0&&0===(b&b-1)},b.CanvasPool={create:function(a,c,d){var e,f=b.CanvasPool.getFirst();if(f===-1){var g={parent:a,canvas:document.createElement("canvas")};b.CanvasPool.pool.push(g),e=g.canvas}else b.CanvasPool.pool[f].parent=a,e=b.CanvasPool.pool[f].canvas;return void 0!==c&&(e.width=c,e.height=d),e},getFirst:function(){for(var a=b.CanvasPool.pool,c=0;c<a.length;c++)if(!a[c].parent)return c;return-1},remove:function(a){for(var c=b.CanvasPool.pool,d=0;d<c.length;d++)c[d].parent===a&&(c[d].parent=null,c[d].canvas.width=1,c[d].canvas.height=1)},removeByCanvas:function(a){for(var c=b.CanvasPool.pool,d=0;d<c.length;d++)c[d].canvas===a&&(c[d].parent=null,c[d].canvas.width=1,c[d].canvas.height=1)},getTotal:function(){for(var a=b.CanvasPool.pool,c=0,d=0;d<a.length;d++)a[d].parent&&c++;return c},getFree:function(){for(var a=b.CanvasPool.pool,c=0,d=0;d<a.length;d++)a[d].parent||c++;return c}},b.CanvasPool.pool=[],b.initDefaultShaders=function(){},b.CompileVertexShader=function(a,c){return b._CompileShader(a,c,a.VERTEX_SHADER)},b.CompileFragmentShader=function(a,c){return b._CompileShader(a,c,a.FRAGMENT_SHADER)},b._CompileShader=function(a,b,c){var d=b;Array.isArray(b)&&(d=b.join("\n"));var e=a.createShader(c);return a.shaderSource(e,d),a.compileShader(e),a.getShaderParameter(e,a.COMPILE_STATUS)?e:(window.console.log(a.getShaderInfoLog(e)),null)},b.compileProgram=function(a,c,d){var e=b.CompileFragmentShader(a,d),f=b.CompileVertexShader(a,c),g=a.createProgram();return a.attachShader(g,f),a.attachShader(g,e),a.linkProgram(g),a.getProgramParameter(g,a.LINK_STATUS)||(window.console.log(a.getProgramInfoLog(g)),window.console.log("Could not initialise shaders")),g},b.PixiShader=function(a){this._UID=b._UID++,this.gl=a,this.program=null,this.fragmentSrc=["precision lowp float;","varying vec2 vTextureCoord;","varying vec4 vColor;","uniform sampler2D uSampler;","void main(void) {","   gl_FragColor = texture2D(uSampler, vTextureCoord) * vColor ;","}"],this.textureCount=0,this.firstRun=!0,this.dirty=!0,this.attributes=[],this.init()},b.PixiShader.prototype.constructor=b.PixiShader,b.PixiShader.prototype.init=function(){var a=this.gl,c=b.compileProgram(a,this.vertexSrc||b.PixiShader.defaultVertexSrc,this.fragmentSrc);a.useProgram(c),this.uSampler=a.getUniformLocation(c,"uSampler"),this.projectionVector=a.getUniformLocation(c,"projectionVector"),this.offsetVector=a.getUniformLocation(c,"offsetVector"),this.dimensions=a.getUniformLocation(c,"dimensions"),this.aVertexPosition=a.getAttribLocation(c,"aVertexPosition"),this.aTextureCoord=a.getAttribLocation(c,"aTextureCoord"),this.colorAttribute=a.getAttribLocation(c,"aColor"),this.colorAttribute===-1&&(this.colorAttribute=2),this.attributes=[this.aVertexPosition,this.aTextureCoord,this.colorAttribute];for(var d in this.uniforms)this.uniforms[d].uniformLocation=a.getUniformLocation(c,d);this.initUniforms(),this.program=c},b.PixiShader.prototype.initUniforms=function(){this.textureCount=1;var a,b=this.gl;for(var c in this.uniforms){a=this.uniforms[c];var d=a.type;"sampler2D"===d?(a._init=!1,null!==a.value&&this.initSampler2D(a)):"mat2"===d||"mat3"===d||"mat4"===d?(a.glMatrix=!0,a.glValueLength=1,"mat2"===d?a.glFunc=b.uniformMatrix2fv:"mat3"===d?a.glFunc=b.uniformMatrix3fv:"mat4"===d&&(a.glFunc=b.uniformMatrix4fv)):(a.glFunc=b["uniform"+d],"2f"===d||"2i"===d?a.glValueLength=2:"3f"===d||"3i"===d?a.glValueLength=3:"4f"===d||"4i"===d?a.glValueLength=4:a.glValueLength=1)}},b.PixiShader.prototype.initSampler2D=function(a){if(a.value&&a.value.baseTexture&&a.value.baseTexture.hasLoaded){var b=this.gl;if(b.activeTexture(b["TEXTURE"+this.textureCount]),b.bindTexture(b.TEXTURE_2D,a.value.baseTexture._glTextures[b.id]),a.textureData){var c=a.textureData,d=c.magFilter?c.magFilter:b.LINEAR,e=c.minFilter?c.minFilter:b.LINEAR,f=c.wrapS?c.wrapS:b.CLAMP_TO_EDGE,g=c.wrapT?c.wrapT:b.CLAMP_TO_EDGE,h=c.luminance?b.LUMINANCE:b.RGBA;if(c.repeat&&(f=b.REPEAT,g=b.REPEAT),b.pixelStorei(b.UNPACK_FLIP_Y_WEBGL,!!c.flipY),c.width){var i=c.width?c.width:512,j=c.height?c.height:2,k=c.border?c.border:0;b.texImage2D(b.TEXTURE_2D,0,h,i,j,k,h,b.UNSIGNED_BYTE,null)}else b.texImage2D(b.TEXTURE_2D,0,h,b.RGBA,b.UNSIGNED_BYTE,a.value.baseTexture.source);b.texParameteri(b.TEXTURE_2D,b.TEXTURE_MAG_FILTER,d),b.texParameteri(b.TEXTURE_2D,b.TEXTURE_MIN_FILTER,e),b.texParameteri(b.TEXTURE_2D,b.TEXTURE_WRAP_S,f),b.texParameteri(b.TEXTURE_2D,b.TEXTURE_WRAP_T,g)}b.uniform1i(a.uniformLocation,this.textureCount),a._init=!0,this.textureCount++}},b.PixiShader.prototype.syncUniforms=function(){this.textureCount=1;var a,c=this.gl;for(var d in this.uniforms)a=this.uniforms[d],1===a.glValueLength?a.glMatrix===!0?a.glFunc.call(c,a.uniformLocation,a.transpose,a.value):a.glFunc.call(c,a.uniformLocation,a.value):2===a.glValueLength?a.glFunc.call(c,a.uniformLocation,a.value.x,a.value.y):3===a.glValueLength?a.glFunc.call(c,a.uniformLocation,a.value.x,a.value.y,a.value.z):4===a.glValueLength?a.glFunc.call(c,a.uniformLocation,a.value.x,a.value.y,a.value.z,a.value.w):"sampler2D"===a.type&&(a._init?(c.activeTexture(c["TEXTURE"+this.textureCount]),a.value.baseTexture._dirty[c.id]?b.instances[c.id].updateTexture(a.value.baseTexture):c.bindTexture(c.TEXTURE_2D,a.value.baseTexture._glTextures[c.id]),c.uniform1i(a.uniformLocation,this.textureCount),this.textureCount++):this.initSampler2D(a))},b.PixiShader.prototype.destroy=function(){this.gl.deleteProgram(this.program),this.uniforms=null,this.gl=null,this.attributes=null},b.PixiShader.defaultVertexSrc=["attribute vec2 aVertexPosition;","attribute vec2 aTextureCoord;","attribute vec4 aColor;","uniform vec2 projectionVector;","uniform vec2 offsetVector;","varying vec2 vTextureCoord;","varying vec4 vColor;","const vec2 center = vec2(-1.0, 1.0);","void main(void) {","   gl_Position = vec4( ((aVertexPosition + offsetVector) / projectionVector) + center , 0.0, 1.0);","   vTextureCoord = aTextureCoord;","   vColor = vec4(aColor.rgb * aColor.a, aColor.a);","}"],b.PixiFastShader=function(a){this._UID=b._UID++,this.gl=a,this.program=null,this.fragmentSrc=["precision lowp float;","varying vec2 vTextureCoord;","varying float vColor;","uniform sampler2D uSampler;","void main(void) {","   gl_FragColor = texture2D(uSampler, vTextureCoord) * vColor ;","}"],this.vertexSrc=["attribute vec2 aVertexPosition;","attribute vec2 aPositionCoord;","attribute vec2 aScale;","attribute float aRotation;","attribute vec2 aTextureCoord;","attribute float aColor;","uniform vec2 projectionVector;","uniform vec2 offsetVector;","uniform mat3 uMatrix;","varying vec2 vTextureCoord;","varying float vColor;","const vec2 center = vec2(-1.0, 1.0);","void main(void) {","   vec2 v;","   vec2 sv = aVertexPosition * aScale;","   v.x = (sv.x) * cos(aRotation) - (sv.y) * sin(aRotation);","   v.y = (sv.x) * sin(aRotation) + (sv.y) * cos(aRotation);","   v = ( uMatrix * vec3(v + aPositionCoord , 1.0) ).xy ;","   gl_Position = vec4( ( v / projectionVector) + center , 0.0, 1.0);","   vTextureCoord = aTextureCoord;","   vColor = aColor;","}"],this.textureCount=0,this.init()},b.PixiFastShader.prototype.constructor=b.PixiFastShader,b.PixiFastShader.prototype.init=function(){var a=this.gl,c=b.compileProgram(a,this.vertexSrc,this.fragmentSrc);a.useProgram(c),this.uSampler=a.getUniformLocation(c,"uSampler"),this.projectionVector=a.getUniformLocation(c,"projectionVector"),this.offsetVector=a.getUniformLocation(c,"offsetVector"),this.dimensions=a.getUniformLocation(c,"dimensions"),this.uMatrix=a.getUniformLocation(c,"uMatrix"),this.aVertexPosition=a.getAttribLocation(c,"aVertexPosition"),this.aPositionCoord=a.getAttribLocation(c,"aPositionCoord"),this.aScale=a.getAttribLocation(c,"aScale"),this.aRotation=a.getAttribLocation(c,"aRotation"),this.aTextureCoord=a.getAttribLocation(c,"aTextureCoord"),this.colorAttribute=a.getAttribLocation(c,"aColor"),this.colorAttribute===-1&&(this.colorAttribute=2),this.attributes=[this.aVertexPosition,this.aPositionCoord,this.aScale,this.aRotation,this.aTextureCoord,this.colorAttribute],this.program=c},b.PixiFastShader.prototype.destroy=function(){this.gl.deleteProgram(this.program),this.uniforms=null,this.gl=null,this.attributes=null},b.StripShader=function(a){this._UID=b._UID++,this.gl=a,this.program=null,this.fragmentSrc=["precision mediump float;","varying vec2 vTextureCoord;","uniform float alpha;","uniform sampler2D uSampler;","void main(void) {","   gl_FragColor = texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y)) * alpha;","}"],this.vertexSrc=["attribute vec2 aVertexPosition;","attribute vec2 aTextureCoord;","uniform mat3 translationMatrix;","uniform vec2 projectionVector;","uniform vec2 offsetVector;","varying vec2 vTextureCoord;","void main(void) {","   vec3 v = translationMatrix * vec3(aVertexPosition , 1.0);","   v -= offsetVector.xyx;","   gl_Position = vec4( v.x / projectionVector.x -1.0, v.y / -projectionVector.y + 1.0 , 0.0, 1.0);","   vTextureCoord = aTextureCoord;","}"],this.init()},b.StripShader.prototype.constructor=b.StripShader,b.StripShader.prototype.init=function(){var a=this.gl,c=b.compileProgram(a,this.vertexSrc,this.fragmentSrc);a.useProgram(c),this.uSampler=a.getUniformLocation(c,"uSampler"),this.projectionVector=a.getUniformLocation(c,"projectionVector"),this.offsetVector=a.getUniformLocation(c,"offsetVector"),this.colorAttribute=a.getAttribLocation(c,"aColor"),this.aVertexPosition=a.getAttribLocation(c,"aVertexPosition"),this.aTextureCoord=a.getAttribLocation(c,"aTextureCoord"),this.attributes=[this.aVertexPosition,this.aTextureCoord],this.translationMatrix=a.getUniformLocation(c,"translationMatrix"),this.alpha=a.getUniformLocation(c,"alpha"),this.program=c},b.StripShader.prototype.destroy=function(){this.gl.deleteProgram(this.program),this.uniforms=null,this.gl=null,this.attribute=null},b.PrimitiveShader=function(a){this._UID=b._UID++,this.gl=a,this.program=null,this.fragmentSrc=["precision mediump float;","varying vec4 vColor;","void main(void) {","   gl_FragColor = vColor;","}"],this.vertexSrc=["attribute vec2 aVertexPosition;","attribute vec4 aColor;","uniform mat3 translationMatrix;","uniform vec2 projectionVector;","uniform vec2 offsetVector;","uniform float alpha;","uniform float flipY;","uniform vec3 tint;","varying vec4 vColor;","void main(void) {","   vec3 v = translationMatrix * vec3(aVertexPosition , 1.0);","   v -= offsetVector.xyx;","   gl_Position = vec4( v.x / projectionVector.x -1.0, (v.y / projectionVector.y * -flipY) + flipY , 0.0, 1.0);","   vColor = aColor * vec4(tint * alpha, alpha);","}"],this.init()},b.PrimitiveShader.prototype.constructor=b.PrimitiveShader,b.PrimitiveShader.prototype.init=function(){var a=this.gl,c=b.compileProgram(a,this.vertexSrc,this.fragmentSrc);a.useProgram(c),this.projectionVector=a.getUniformLocation(c,"projectionVector"),this.offsetVector=a.getUniformLocation(c,"offsetVector"),this.tintColor=a.getUniformLocation(c,"tint"),this.flipY=a.getUniformLocation(c,"flipY"),this.aVertexPosition=a.getAttribLocation(c,"aVertexPosition"),this.colorAttribute=a.getAttribLocation(c,"aColor"),this.attributes=[this.aVertexPosition,this.colorAttribute],this.translationMatrix=a.getUniformLocation(c,"translationMatrix"),this.alpha=a.getUniformLocation(c,"alpha"),this.program=c},b.PrimitiveShader.prototype.destroy=function(){this.gl.deleteProgram(this.program),this.uniforms=null,this.gl=null,this.attributes=null},b.ComplexPrimitiveShader=function(a){this._UID=b._UID++,this.gl=a,this.program=null,this.fragmentSrc=["precision mediump float;","varying vec4 vColor;","void main(void) {","   gl_FragColor = vColor;","}"],this.vertexSrc=["attribute vec2 aVertexPosition;","uniform mat3 translationMatrix;","uniform vec2 projectionVector;","uniform vec2 offsetVector;","uniform vec3 tint;","uniform float alpha;","uniform vec3 color;","uniform float flipY;","varying vec4 vColor;","void main(void) {","   vec3 v = translationMatrix * vec3(aVertexPosition , 1.0);","   v -= offsetVector.xyx;","   gl_Position = vec4( v.x / projectionVector.x -1.0, (v.y / projectionVector.y * -flipY) + flipY , 0.0, 1.0);","   vColor = vec4(color * alpha * tint, alpha);","}"],this.init()},b.ComplexPrimitiveShader.prototype.constructor=b.ComplexPrimitiveShader,b.ComplexPrimitiveShader.prototype.init=function(){var a=this.gl,c=b.compileProgram(a,this.vertexSrc,this.fragmentSrc);a.useProgram(c),this.projectionVector=a.getUniformLocation(c,"projectionVector"),this.offsetVector=a.getUniformLocation(c,"offsetVector"),this.tintColor=a.getUniformLocation(c,"tint"),this.color=a.getUniformLocation(c,"color"),this.flipY=a.getUniformLocation(c,"flipY"),this.aVertexPosition=a.getAttribLocation(c,"aVertexPosition"),this.attributes=[this.aVertexPosition,this.colorAttribute],this.translationMatrix=a.getUniformLocation(c,"translationMatrix"),this.alpha=a.getUniformLocation(c,"alpha"),this.program=c},b.ComplexPrimitiveShader.prototype.destroy=function(){this.gl.deleteProgram(this.program),this.uniforms=null,this.gl=null,this.attribute=null},b.glContexts=[],b.instances=[],b.WebGLRenderer=function(a){this.game=a,b.defaultRenderer||(b.defaultRenderer=this),this.type=b.WEBGL_RENDERER,this.resolution=a.resolution,this.transparent=a.transparent,this.autoResize=!1,this.preserveDrawingBuffer=a.preserveDrawingBuffer,this.clearBeforeRender=a.clearBeforeRender,this.width=a.width,this.height=a.height,this.view=a.canvas,this._contextOptions={alpha:this.transparent,antialias:a.antialias,premultipliedAlpha:this.transparent&&"notMultiplied"!==this.transparent,stencil:!0,preserveDrawingBuffer:this.preserveDrawingBuffer},this.projection=new b.Point,this.offset=new b.Point,this.shaderManager=new b.WebGLShaderManager,this.spriteBatch=new b.WebGLSpriteBatch,this.maskManager=new b.WebGLMaskManager,this.filterManager=new b.WebGLFilterManager,this.stencilManager=new b.WebGLStencilManager,this.blendModeManager=new b.WebGLBlendModeManager,this.renderSession={},this.renderSession.game=this.game,this.renderSession.gl=this.gl,this.renderSession.drawCount=0,this.renderSession.shaderManager=this.shaderManager,this.renderSession.maskManager=this.maskManager,this.renderSession.filterManager=this.filterManager,this.renderSession.blendModeManager=this.blendModeManager,this.renderSession.spriteBatch=this.spriteBatch,this.renderSession.stencilManager=this.stencilManager,this.renderSession.renderer=this,
this.renderSession.resolution=this.resolution,this.initContext(),this.mapBlendModes()},b.WebGLRenderer.prototype.constructor=b.WebGLRenderer,b.WebGLRenderer.prototype.initContext=function(){var a=this.view.getContext("webgl",this._contextOptions)||this.view.getContext("experimental-webgl",this._contextOptions);if(this.gl=a,!a)throw new Error("This browser does not support webGL. Try using the canvas renderer");this.glContextId=a.id=b.WebGLRenderer.glContextId++,b.glContexts[this.glContextId]=a,b.instances[this.glContextId]=this,a.disable(a.DEPTH_TEST),a.disable(a.CULL_FACE),a.enable(a.BLEND),this.shaderManager.setContext(a),this.spriteBatch.setContext(a),this.maskManager.setContext(a),this.filterManager.setContext(a),this.blendModeManager.setContext(a),this.stencilManager.setContext(a),this.renderSession.gl=this.gl,this.resize(this.width,this.height)},b.WebGLRenderer.prototype.render=function(a){if(!this.contextLost){var b=this.gl;b.viewport(0,0,this.width,this.height),b.bindFramebuffer(b.FRAMEBUFFER,null),this.game.clearBeforeRender&&(b.clearColor(a._bgColor.r,a._bgColor.g,a._bgColor.b,a._bgColor.a),b.clear(b.COLOR_BUFFER_BIT)),this.offset.x=this.game.camera._shake.x,this.offset.y=this.game.camera._shake.y,this.renderDisplayObject(a,this.projection)}},b.WebGLRenderer.prototype.renderDisplayObject=function(a,c,d,e){this.renderSession.blendModeManager.setBlendMode(b.blendModes.NORMAL),this.renderSession.drawCount=0,this.renderSession.flipY=d?-1:1,this.renderSession.projection=c,this.renderSession.offset=this.offset,this.spriteBatch.begin(this.renderSession),this.filterManager.begin(this.renderSession,d),a._renderWebGL(this.renderSession,e),this.spriteBatch.end()},b.WebGLRenderer.prototype.resize=function(a,b){this.width=a*this.resolution,this.height=b*this.resolution,this.view.width=this.width,this.view.height=this.height,this.autoResize&&(this.view.style.width=this.width/this.resolution+"px",this.view.style.height=this.height/this.resolution+"px"),this.gl.viewport(0,0,this.width,this.height),this.projection.x=this.width/2/this.resolution,this.projection.y=-this.height/2/this.resolution},b.WebGLRenderer.prototype.updateTexture=function(a){if(!a.hasLoaded)return!1;var c=this.gl;return a._glTextures[c.id]||(a._glTextures[c.id]=c.createTexture()),c.bindTexture(c.TEXTURE_2D,a._glTextures[c.id]),c.pixelStorei(c.UNPACK_PREMULTIPLY_ALPHA_WEBGL,a.premultipliedAlpha),c.texImage2D(c.TEXTURE_2D,0,c.RGBA,c.RGBA,c.UNSIGNED_BYTE,a.source),c.texParameteri(c.TEXTURE_2D,c.TEXTURE_MAG_FILTER,a.scaleMode===b.scaleModes.LINEAR?c.LINEAR:c.NEAREST),a.mipmap&&b.isPowerOfTwo(a.width,a.height)?(c.texParameteri(c.TEXTURE_2D,c.TEXTURE_MIN_FILTER,a.scaleMode===b.scaleModes.LINEAR?c.LINEAR_MIPMAP_LINEAR:c.NEAREST_MIPMAP_NEAREST),c.generateMipmap(c.TEXTURE_2D)):c.texParameteri(c.TEXTURE_2D,c.TEXTURE_MIN_FILTER,a.scaleMode===b.scaleModes.LINEAR?c.LINEAR:c.NEAREST),a._powerOf2?(c.texParameteri(c.TEXTURE_2D,c.TEXTURE_WRAP_S,c.REPEAT),c.texParameteri(c.TEXTURE_2D,c.TEXTURE_WRAP_T,c.REPEAT)):(c.texParameteri(c.TEXTURE_2D,c.TEXTURE_WRAP_S,c.CLAMP_TO_EDGE),c.texParameteri(c.TEXTURE_2D,c.TEXTURE_WRAP_T,c.CLAMP_TO_EDGE)),a._dirty[c.id]=!1,!0},b.WebGLRenderer.prototype.destroy=function(){b.glContexts[this.glContextId]=null,this.projection=null,this.offset=null,this.shaderManager.destroy(),this.spriteBatch.destroy(),this.maskManager.destroy(),this.filterManager.destroy(),this.shaderManager=null,this.spriteBatch=null,this.maskManager=null,this.filterManager=null,this.gl=null,this.renderSession=null,b.CanvasPool.remove(this),b.instances[this.glContextId]=null,b.WebGLRenderer.glContextId--},b.WebGLRenderer.prototype.mapBlendModes=function(){var a=this.gl;if(!b.blendModesWebGL){var c=[],d=b.blendModes;c[d.NORMAL]=[a.ONE,a.ONE_MINUS_SRC_ALPHA],c[d.ADD]=[a.SRC_ALPHA,a.DST_ALPHA],c[d.MULTIPLY]=[a.DST_COLOR,a.ONE_MINUS_SRC_ALPHA],c[d.SCREEN]=[a.SRC_ALPHA,a.ONE],c[d.OVERLAY]=[a.ONE,a.ONE_MINUS_SRC_ALPHA],c[d.DARKEN]=[a.ONE,a.ONE_MINUS_SRC_ALPHA],c[d.LIGHTEN]=[a.ONE,a.ONE_MINUS_SRC_ALPHA],c[d.COLOR_DODGE]=[a.ONE,a.ONE_MINUS_SRC_ALPHA],c[d.COLOR_BURN]=[a.ONE,a.ONE_MINUS_SRC_ALPHA],c[d.HARD_LIGHT]=[a.ONE,a.ONE_MINUS_SRC_ALPHA],c[d.SOFT_LIGHT]=[a.ONE,a.ONE_MINUS_SRC_ALPHA],c[d.DIFFERENCE]=[a.ONE,a.ONE_MINUS_SRC_ALPHA],c[d.EXCLUSION]=[a.ONE,a.ONE_MINUS_SRC_ALPHA],c[d.HUE]=[a.ONE,a.ONE_MINUS_SRC_ALPHA],c[d.SATURATION]=[a.ONE,a.ONE_MINUS_SRC_ALPHA],c[d.COLOR]=[a.ONE,a.ONE_MINUS_SRC_ALPHA],c[d.LUMINOSITY]=[a.ONE,a.ONE_MINUS_SRC_ALPHA],b.blendModesWebGL=c}},b.WebGLRenderer.glContextId=0,b.WebGLBlendModeManager=function(){this.currentBlendMode=99999},b.WebGLBlendModeManager.prototype.constructor=b.WebGLBlendModeManager,b.WebGLBlendModeManager.prototype.setContext=function(a){this.gl=a},b.WebGLBlendModeManager.prototype.setBlendMode=function(a){if(this.currentBlendMode===a)return!1;this.currentBlendMode=a;var c=b.blendModesWebGL[this.currentBlendMode];return c&&this.gl.blendFunc(c[0],c[1]),!0},b.WebGLBlendModeManager.prototype.destroy=function(){this.gl=null},b.WebGLMaskManager=function(){},b.WebGLMaskManager.prototype.constructor=b.WebGLMaskManager,b.WebGLMaskManager.prototype.setContext=function(a){this.gl=a},b.WebGLMaskManager.prototype.pushMask=function(a,c){var d=c.gl;a.dirty&&b.WebGLGraphics.updateGraphics(a,d),void 0!==a._webGL[d.id]&&void 0!==a._webGL[d.id].data&&0!==a._webGL[d.id].data.length&&c.stencilManager.pushStencil(a,a._webGL[d.id].data[0],c)},b.WebGLMaskManager.prototype.popMask=function(a,b){var c=this.gl;void 0!==a._webGL[c.id]&&void 0!==a._webGL[c.id].data&&0!==a._webGL[c.id].data.length&&b.stencilManager.popStencil(a,a._webGL[c.id].data[0],b)},b.WebGLMaskManager.prototype.destroy=function(){this.gl=null},b.WebGLStencilManager=function(){this.stencilStack=[],this.reverse=!0,this.count=0},b.WebGLStencilManager.prototype.setContext=function(a){this.gl=a},b.WebGLStencilManager.prototype.pushStencil=function(a,b,c){var d=this.gl;this.bindGraphics(a,b,c),0===this.stencilStack.length&&(d.enable(d.STENCIL_TEST),d.clear(d.STENCIL_BUFFER_BIT),this.reverse=!0,this.count=0),this.stencilStack.push(b);var e=this.count;d.colorMask(!1,!1,!1,!1),d.stencilFunc(d.ALWAYS,0,255),d.stencilOp(d.KEEP,d.KEEP,d.INVERT),1===b.mode?(d.drawElements(d.TRIANGLE_FAN,b.indices.length-4,d.UNSIGNED_SHORT,0),this.reverse?(d.stencilFunc(d.EQUAL,255-e,255),d.stencilOp(d.KEEP,d.KEEP,d.DECR)):(d.stencilFunc(d.EQUAL,e,255),d.stencilOp(d.KEEP,d.KEEP,d.INCR)),d.drawElements(d.TRIANGLE_FAN,4,d.UNSIGNED_SHORT,2*(b.indices.length-4)),this.reverse?d.stencilFunc(d.EQUAL,255-(e+1),255):d.stencilFunc(d.EQUAL,e+1,255),this.reverse=!this.reverse):(this.reverse?(d.stencilFunc(d.EQUAL,e,255),d.stencilOp(d.KEEP,d.KEEP,d.INCR)):(d.stencilFunc(d.EQUAL,255-e,255),d.stencilOp(d.KEEP,d.KEEP,d.DECR)),d.drawElements(d.TRIANGLE_STRIP,b.indices.length,d.UNSIGNED_SHORT,0),this.reverse?d.stencilFunc(d.EQUAL,e+1,255):d.stencilFunc(d.EQUAL,255-(e+1),255)),d.colorMask(!0,!0,!0,!0),d.stencilOp(d.KEEP,d.KEEP,d.KEEP),this.count++},b.WebGLStencilManager.prototype.bindGraphics=function(a,c,d){this._currentGraphics=a;var e,f=this.gl,g=d.projection,h=d.offset;1===c.mode?(e=d.shaderManager.complexPrimitiveShader,d.shaderManager.setShader(e),f.uniform1f(e.flipY,d.flipY),f.uniformMatrix3fv(e.translationMatrix,!1,a.worldTransform.toArray(!0)),f.uniform2f(e.projectionVector,g.x,-g.y),f.uniform2f(e.offsetVector,-h.x,-h.y),f.uniform3fv(e.tintColor,b.hex2rgb(a.tint)),f.uniform3fv(e.color,c.color),f.uniform1f(e.alpha,a.worldAlpha*c.alpha),f.bindBuffer(f.ARRAY_BUFFER,c.buffer),f.vertexAttribPointer(e.aVertexPosition,2,f.FLOAT,!1,8,0),f.bindBuffer(f.ELEMENT_ARRAY_BUFFER,c.indexBuffer)):(e=d.shaderManager.primitiveShader,d.shaderManager.setShader(e),f.uniformMatrix3fv(e.translationMatrix,!1,a.worldTransform.toArray(!0)),f.uniform1f(e.flipY,d.flipY),f.uniform2f(e.projectionVector,g.x,-g.y),f.uniform2f(e.offsetVector,-h.x,-h.y),f.uniform3fv(e.tintColor,b.hex2rgb(a.tint)),f.uniform1f(e.alpha,a.worldAlpha),f.bindBuffer(f.ARRAY_BUFFER,c.buffer),f.vertexAttribPointer(e.aVertexPosition,2,f.FLOAT,!1,24,0),f.vertexAttribPointer(e.colorAttribute,4,f.FLOAT,!1,24,8),f.bindBuffer(f.ELEMENT_ARRAY_BUFFER,c.indexBuffer))},b.WebGLStencilManager.prototype.popStencil=function(a,b,c){var d=this.gl;if(this.stencilStack.pop(),this.count--,0===this.stencilStack.length)d.disable(d.STENCIL_TEST);else{var e=this.count;this.bindGraphics(a,b,c),d.colorMask(!1,!1,!1,!1),1===b.mode?(this.reverse=!this.reverse,this.reverse?(d.stencilFunc(d.EQUAL,255-(e+1),255),d.stencilOp(d.KEEP,d.KEEP,d.INCR)):(d.stencilFunc(d.EQUAL,e+1,255),d.stencilOp(d.KEEP,d.KEEP,d.DECR)),d.drawElements(d.TRIANGLE_FAN,4,d.UNSIGNED_SHORT,2*(b.indices.length-4)),d.stencilFunc(d.ALWAYS,0,255),d.stencilOp(d.KEEP,d.KEEP,d.INVERT),d.drawElements(d.TRIANGLE_FAN,b.indices.length-4,d.UNSIGNED_SHORT,0),this.reverse?d.stencilFunc(d.EQUAL,e,255):d.stencilFunc(d.EQUAL,255-e,255)):(this.reverse?(d.stencilFunc(d.EQUAL,e+1,255),d.stencilOp(d.KEEP,d.KEEP,d.DECR)):(d.stencilFunc(d.EQUAL,255-(e+1),255),d.stencilOp(d.KEEP,d.KEEP,d.INCR)),d.drawElements(d.TRIANGLE_STRIP,b.indices.length,d.UNSIGNED_SHORT,0),this.reverse?d.stencilFunc(d.EQUAL,e,255):d.stencilFunc(d.EQUAL,255-e,255)),d.colorMask(!0,!0,!0,!0),d.stencilOp(d.KEEP,d.KEEP,d.KEEP)}},b.WebGLStencilManager.prototype.destroy=function(){this.stencilStack=null,this.gl=null},b.WebGLShaderManager=function(){this.maxAttibs=10,this.attribState=[],this.tempAttribState=[];for(var a=0;a<this.maxAttibs;a++)this.attribState[a]=!1;this.stack=[]},b.WebGLShaderManager.prototype.constructor=b.WebGLShaderManager,b.WebGLShaderManager.prototype.setContext=function(a){this.gl=a,this.primitiveShader=new b.PrimitiveShader(a),this.complexPrimitiveShader=new b.ComplexPrimitiveShader(a),this.defaultShader=new b.PixiShader(a),this.fastShader=new b.PixiFastShader(a),this.stripShader=new b.StripShader(a),this.setShader(this.defaultShader)},b.WebGLShaderManager.prototype.setAttribs=function(a){var b;for(b=0;b<this.tempAttribState.length;b++)this.tempAttribState[b]=!1;for(b=0;b<a.length;b++){var c=a[b];this.tempAttribState[c]=!0}var d=this.gl;for(b=0;b<this.attribState.length;b++)this.attribState[b]!==this.tempAttribState[b]&&(this.attribState[b]=this.tempAttribState[b],this.tempAttribState[b]?d.enableVertexAttribArray(b):d.disableVertexAttribArray(b))},b.WebGLShaderManager.prototype.setShader=function(a){return this._currentId!==a._UID&&(this._currentId=a._UID,this.currentShader=a,this.gl.useProgram(a.program),this.setAttribs(a.attributes),!0)},b.WebGLShaderManager.prototype.destroy=function(){this.attribState=null,this.tempAttribState=null,this.primitiveShader.destroy(),this.complexPrimitiveShader.destroy(),this.defaultShader.destroy(),this.fastShader.destroy(),this.stripShader.destroy(),this.gl=null},b.WebGLSpriteBatch=function(){this.vertSize=5,this.size=2e3;var a=4*this.size*4*this.vertSize,c=6*this.size;this.vertices=new b.ArrayBuffer(a),this.positions=new b.Float32Array(this.vertices),this.colors=new b.Uint32Array(this.vertices),this.indices=new b.Uint16Array(c),this.lastIndexCount=0;for(var d=0,e=0;d<c;d+=6,e+=4)this.indices[d+0]=e+0,this.indices[d+1]=e+1,this.indices[d+2]=e+2,this.indices[d+3]=e+0,this.indices[d+4]=e+2,this.indices[d+5]=e+3;this.drawing=!1,this.currentBatchSize=0,this.currentBaseTexture=null,this.dirty=!0,this.textures=[],this.blendModes=[],this.shaders=[],this.sprites=[],this.defaultShader=new b.AbstractFilter(["precision lowp float;","varying vec2 vTextureCoord;","varying vec4 vColor;","uniform sampler2D uSampler;","void main(void) {","   gl_FragColor = texture2D(uSampler, vTextureCoord) * vColor ;","}"])},b.WebGLSpriteBatch.prototype.setContext=function(a){this.gl=a,this.vertexBuffer=a.createBuffer(),this.indexBuffer=a.createBuffer(),a.bindBuffer(a.ELEMENT_ARRAY_BUFFER,this.indexBuffer),a.bufferData(a.ELEMENT_ARRAY_BUFFER,this.indices,a.STATIC_DRAW),a.bindBuffer(a.ARRAY_BUFFER,this.vertexBuffer),a.bufferData(a.ARRAY_BUFFER,this.vertices,a.DYNAMIC_DRAW),this.currentBlendMode=99999;var c=new b.PixiShader(a);c.fragmentSrc=this.defaultShader.fragmentSrc,c.uniforms={},c.init(),this.defaultShader.shaders[a.id]=c},b.WebGLSpriteBatch.prototype.begin=function(a){this.renderSession=a,this.shader=this.renderSession.shaderManager.defaultShader,this.start()},b.WebGLSpriteBatch.prototype.end=function(){this.flush()},b.WebGLSpriteBatch.prototype.render=function(a,b){var c=a.texture,d=a.worldTransform;b&&(d=b),this.currentBatchSize>=this.size&&(this.flush(),this.currentBaseTexture=c.baseTexture);var e=c._uvs;if(e){var f,g,h,i,j=a.anchor.x,k=a.anchor.y;if(c.trim){var l=c.trim;g=l.x-j*l.width,f=g+c.crop.width,i=l.y-k*l.height,h=i+c.crop.height}else f=c.frame.width*(1-j),g=c.frame.width*-j,h=c.frame.height*(1-k),i=c.frame.height*-k;var m=4*this.currentBatchSize*this.vertSize,n=c.baseTexture.resolution,o=d.a/n,p=d.b/n,q=d.c/n,r=d.d/n,s=d.tx,t=d.ty,u=this.colors,v=this.positions;this.renderSession.roundPixels?(v[m]=o*g+q*i+s|0,v[m+1]=r*i+p*g+t|0,v[m+5]=o*f+q*i+s|0,v[m+6]=r*i+p*f+t|0,v[m+10]=o*f+q*h+s|0,v[m+11]=r*h+p*f+t|0,v[m+15]=o*g+q*h+s|0,v[m+16]=r*h+p*g+t|0):(v[m]=o*g+q*i+s,v[m+1]=r*i+p*g+t,v[m+5]=o*f+q*i+s,v[m+6]=r*i+p*f+t,v[m+10]=o*f+q*h+s,v[m+11]=r*h+p*f+t,v[m+15]=o*g+q*h+s,v[m+16]=r*h+p*g+t),v[m+2]=e.x0,v[m+3]=e.y0,v[m+7]=e.x1,v[m+8]=e.y1,v[m+12]=e.x2,v[m+13]=e.y2,v[m+17]=e.x3,v[m+18]=e.y3;var w=a.tint;u[m+4]=u[m+9]=u[m+14]=u[m+19]=(w>>16)+(65280&w)+((255&w)<<16)+(255*a.worldAlpha<<24),this.sprites[this.currentBatchSize++]=a}},b.WebGLSpriteBatch.prototype.renderTilingSprite=function(a){var c=a.tilingTexture;this.currentBatchSize>=this.size&&(this.flush(),this.currentBaseTexture=c.baseTexture),a._uvs||(a._uvs=new b.TextureUvs);var d=a._uvs,e=c.baseTexture.width,f=c.baseTexture.height;a.tilePosition.x%=e*a.tileScaleOffset.x,a.tilePosition.y%=f*a.tileScaleOffset.y;var g=a.tilePosition.x/(e*a.tileScaleOffset.x),h=a.tilePosition.y/(f*a.tileScaleOffset.y),i=a.width/e/(a.tileScale.x*a.tileScaleOffset.x),j=a.height/f/(a.tileScale.y*a.tileScaleOffset.y);d.x0=0-g,d.y0=0-h,d.x1=1*i-g,d.y1=0-h,d.x2=1*i-g,d.y2=1*j-h,d.x3=0-g,d.y3=1*j-h;var k=a.tint,l=(k>>16)+(65280&k)+((255&k)<<16)+(255*a.worldAlpha<<24),m=this.positions,n=this.colors,o=a.width,p=a.height,q=a.anchor.x,r=a.anchor.y,s=o*(1-q),t=o*-q,u=p*(1-r),v=p*-r,w=4*this.currentBatchSize*this.vertSize,x=c.baseTexture.resolution,y=a.worldTransform,z=y.a/x,A=y.b/x,B=y.c/x,C=y.d/x,D=y.tx,E=y.ty;m[w++]=z*t+B*v+D,m[w++]=C*v+A*t+E,m[w++]=d.x0,m[w++]=d.y0,n[w++]=l,m[w++]=z*s+B*v+D,m[w++]=C*v+A*s+E,m[w++]=d.x1,m[w++]=d.y1,n[w++]=l,m[w++]=z*s+B*u+D,m[w++]=C*u+A*s+E,m[w++]=d.x2,m[w++]=d.y2,n[w++]=l,m[w++]=z*t+B*u+D,m[w++]=C*u+A*t+E,m[w++]=d.x3,m[w++]=d.y3,n[w++]=l,this.sprites[this.currentBatchSize++]=a},b.WebGLSpriteBatch.prototype.flush=function(){if(0!==this.currentBatchSize){var a,c=this.gl;if(this.dirty){this.dirty=!1,c.activeTexture(c.TEXTURE0),c.bindBuffer(c.ARRAY_BUFFER,this.vertexBuffer),c.bindBuffer(c.ELEMENT_ARRAY_BUFFER,this.indexBuffer),a=this.defaultShader.shaders[c.id];var d=4*this.vertSize;c.vertexAttribPointer(a.aVertexPosition,2,c.FLOAT,!1,d,0),c.vertexAttribPointer(a.aTextureCoord,2,c.FLOAT,!1,d,8),c.vertexAttribPointer(a.colorAttribute,4,c.UNSIGNED_BYTE,!0,d,16)}if(this.currentBatchSize>.5*this.size)c.bufferSubData(c.ARRAY_BUFFER,0,this.vertices);else{var e=this.positions.subarray(0,4*this.currentBatchSize*this.vertSize);c.bufferSubData(c.ARRAY_BUFFER,0,e)}for(var f,g,h,i,j=0,k=0,l=null,m=this.renderSession.blendModeManager.currentBlendMode,n=null,o=!1,p=!1,q=0,r=this.currentBatchSize;q<r;q++){i=this.sprites[q],f=i.tilingTexture?i.tilingTexture.baseTexture:i.texture.baseTexture,g=i.blendMode,h=i.shader||this.defaultShader,o=m!==g,p=n!==h;var s=f.skipRender;if(s&&i.children.length>0&&(s=!1),(l!==f&&!s||o||p)&&(this.renderBatch(l,j,k),k=q,j=0,l=f,o&&(m=g,this.renderSession.blendModeManager.setBlendMode(m)),p)){n=h,a=n.shaders[c.id],a||(a=new b.PixiShader(c),a.fragmentSrc=n.fragmentSrc,a.uniforms=n.uniforms,a.init(),n.shaders[c.id]=a),this.renderSession.shaderManager.setShader(a),a.dirty&&a.syncUniforms();var t=this.renderSession.projection;c.uniform2f(a.projectionVector,t.x,t.y);var u=this.renderSession.offset;c.uniform2f(a.offsetVector,u.x,u.y)}j++}this.renderBatch(l,j,k),this.currentBatchSize=0}},b.WebGLSpriteBatch.prototype.renderBatch=function(a,b,c){if(0!==b){var d=this.gl;if(a._dirty[d.id]){if(!this.renderSession.renderer.updateTexture(a))return}else d.bindTexture(d.TEXTURE_2D,a._glTextures[d.id]);d.drawElements(d.TRIANGLES,6*b,d.UNSIGNED_SHORT,6*c*2),this.renderSession.drawCount++}},b.WebGLSpriteBatch.prototype.stop=function(){this.flush(),this.dirty=!0},b.WebGLSpriteBatch.prototype.start=function(){this.dirty=!0},b.WebGLSpriteBatch.prototype.destroy=function(){this.vertices=null,this.indices=null,this.gl.deleteBuffer(this.vertexBuffer),this.gl.deleteBuffer(this.indexBuffer),this.currentBaseTexture=null,this.gl=null},b.WebGLFastSpriteBatch=function(a){this.vertSize=10,this.maxSize=6e3,this.size=this.maxSize;var c=4*this.size*this.vertSize,d=6*this.maxSize;this.vertices=new b.Float32Array(c),this.indices=new b.Uint16Array(d),this.vertexBuffer=null,this.indexBuffer=null,this.lastIndexCount=0;for(var e=0,f=0;e<d;e+=6,f+=4)this.indices[e+0]=f+0,this.indices[e+1]=f+1,this.indices[e+2]=f+2,this.indices[e+3]=f+0,this.indices[e+4]=f+2,this.indices[e+5]=f+3;this.drawing=!1,this.currentBatchSize=0,this.currentBaseTexture=null,this.currentBlendMode=0,this.renderSession=null,this.shader=null,this.matrix=null,this.setContext(a)},b.WebGLFastSpriteBatch.prototype.constructor=b.WebGLFastSpriteBatch,b.WebGLFastSpriteBatch.prototype.setContext=function(a){this.gl=a,this.vertexBuffer=a.createBuffer(),this.indexBuffer=a.createBuffer(),a.bindBuffer(a.ELEMENT_ARRAY_BUFFER,this.indexBuffer),a.bufferData(a.ELEMENT_ARRAY_BUFFER,this.indices,a.STATIC_DRAW),a.bindBuffer(a.ARRAY_BUFFER,this.vertexBuffer),a.bufferData(a.ARRAY_BUFFER,this.vertices,a.DYNAMIC_DRAW)},b.WebGLFastSpriteBatch.prototype.begin=function(a,b){this.renderSession=b,this.shader=this.renderSession.shaderManager.fastShader,this.matrix=a.worldTransform.toArray(!0),this.start()},b.WebGLFastSpriteBatch.prototype.end=function(){this.flush()},b.WebGLFastSpriteBatch.prototype.render=function(a){var b=a.children,c=b[0];if(c.texture._uvs){this.currentBaseTexture=c.texture.baseTexture,c.blendMode!==this.renderSession.blendModeManager.currentBlendMode&&(this.flush(),this.renderSession.blendModeManager.setBlendMode(c.blendMode));for(var d=0,e=b.length;d<e;d++)this.renderSprite(b[d]);this.flush()}},b.WebGLFastSpriteBatch.prototype.renderSprite=function(a){if(a.visible&&(a.texture.baseTexture===this.currentBaseTexture||a.texture.baseTexture.skipRender||(this.flush(),this.currentBaseTexture=a.texture.baseTexture,a.texture._uvs))){var b,c,d,e,f,g,h,i,j=this.vertices;if(b=a.texture._uvs,c=a.texture.frame.width,d=a.texture.frame.height,a.texture.trim){var k=a.texture.trim;f=k.x-a.anchor.x*k.width,e=f+a.texture.crop.width,h=k.y-a.anchor.y*k.height,g=h+a.texture.crop.height}else e=a.texture.frame.width*(1-a.anchor.x),f=a.texture.frame.width*-a.anchor.x,g=a.texture.frame.height*(1-a.anchor.y),h=a.texture.frame.height*-a.anchor.y;i=4*this.currentBatchSize*this.vertSize,j[i++]=f,j[i++]=h,j[i++]=a.position.x,j[i++]=a.position.y,j[i++]=a.scale.x,j[i++]=a.scale.y,j[i++]=a.rotation,j[i++]=b.x0,j[i++]=b.y1,j[i++]=a.alpha,j[i++]=e,j[i++]=h,j[i++]=a.position.x,j[i++]=a.position.y,j[i++]=a.scale.x,j[i++]=a.scale.y,j[i++]=a.rotation,j[i++]=b.x1,j[i++]=b.y1,j[i++]=a.alpha,j[i++]=e,j[i++]=g,j[i++]=a.position.x,j[i++]=a.position.y,j[i++]=a.scale.x,j[i++]=a.scale.y,j[i++]=a.rotation,j[i++]=b.x2,j[i++]=b.y2,j[i++]=a.alpha,j[i++]=f,j[i++]=g,j[i++]=a.position.x,j[i++]=a.position.y,j[i++]=a.scale.x,j[i++]=a.scale.y,j[i++]=a.rotation,j[i++]=b.x3,j[i++]=b.y3,j[i++]=a.alpha,this.currentBatchSize++,this.currentBatchSize>=this.size&&this.flush()}},b.WebGLFastSpriteBatch.prototype.flush=function(){if(0!==this.currentBatchSize){var a=this.gl;if(this.currentBaseTexture._glTextures[a.id]||this.renderSession.renderer.updateTexture(this.currentBaseTexture,a),a.bindTexture(a.TEXTURE_2D,this.currentBaseTexture._glTextures[a.id]),this.currentBatchSize>.5*this.size)a.bufferSubData(a.ARRAY_BUFFER,0,this.vertices);else{var b=this.vertices.subarray(0,4*this.currentBatchSize*this.vertSize);a.bufferSubData(a.ARRAY_BUFFER,0,b)}a.drawElements(a.TRIANGLES,6*this.currentBatchSize,a.UNSIGNED_SHORT,0),this.currentBatchSize=0,this.renderSession.drawCount++}},b.WebGLFastSpriteBatch.prototype.stop=function(){this.flush()},b.WebGLFastSpriteBatch.prototype.start=function(){var a=this.gl;a.activeTexture(a.TEXTURE0),a.bindBuffer(a.ARRAY_BUFFER,this.vertexBuffer),a.bindBuffer(a.ELEMENT_ARRAY_BUFFER,this.indexBuffer);var b=this.renderSession.projection;a.uniform2f(this.shader.projectionVector,b.x,b.y),a.uniformMatrix3fv(this.shader.uMatrix,!1,this.matrix);var c=4*this.vertSize;a.vertexAttribPointer(this.shader.aVertexPosition,2,a.FLOAT,!1,c,0),a.vertexAttribPointer(this.shader.aPositionCoord,2,a.FLOAT,!1,c,8),a.vertexAttribPointer(this.shader.aScale,2,a.FLOAT,!1,c,16),a.vertexAttribPointer(this.shader.aRotation,1,a.FLOAT,!1,c,24),a.vertexAttribPointer(this.shader.aTextureCoord,2,a.FLOAT,!1,c,28),a.vertexAttribPointer(this.shader.colorAttribute,1,a.FLOAT,!1,c,36)},b.WebGLFilterManager=function(){this.filterStack=[],this.offsetX=0,this.offsetY=0},b.WebGLFilterManager.prototype.constructor=b.WebGLFilterManager,b.WebGLFilterManager.prototype.setContext=function(a){this.gl=a,this.texturePool=[],this.initShaderBuffers()},b.WebGLFilterManager.prototype.begin=function(a,b){this.renderSession=a,this.defaultShader=a.shaderManager.defaultShader;var c=this.renderSession.projection;this.width=2*c.x,this.height=2*-c.y,this.buffer=b},b.WebGLFilterManager.prototype.pushFilter=function(a){var c=this.gl,d=this.renderSession.projection,e=this.renderSession.offset;a._filterArea=a.target.filterArea||a.target.getBounds(),a._previous_stencil_mgr=this.renderSession.stencilManager,this.renderSession.stencilManager=new b.WebGLStencilManager,this.renderSession.stencilManager.setContext(c),c.disable(c.STENCIL_TEST),this.filterStack.push(a);var f=a.filterPasses[0];this.offsetX+=a._filterArea.x,this.offsetY+=a._filterArea.y;var g=this.texturePool.pop();g?g.resize(this.width*this.renderSession.resolution,this.height*this.renderSession.resolution):g=new b.FilterTexture(this.gl,this.width*this.renderSession.resolution,this.height*this.renderSession.resolution),c.bindTexture(c.TEXTURE_2D,g.texture);var h=a._filterArea,i=f.padding;h.x-=i,h.y-=i,h.width+=2*i,h.height+=2*i,h.x<0&&(h.x=0),h.width>this.width&&(h.width=this.width),h.y<0&&(h.y=0),h.height>this.height&&(h.height=this.height),c.bindFramebuffer(c.FRAMEBUFFER,g.frameBuffer),c.viewport(0,0,h.width*this.renderSession.resolution,h.height*this.renderSession.resolution),d.x=h.width/2,d.y=-h.height/2,e.x=-h.x,e.y=-h.y,c.colorMask(!0,!0,!0,!0),c.clearColor(0,0,0,0),c.clear(c.COLOR_BUFFER_BIT),a._glFilterTexture=g},b.WebGLFilterManager.prototype.popFilter=function(){var a=this.gl,c=this.filterStack.pop(),d=c._filterArea,e=c._glFilterTexture,f=this.renderSession.projection,g=this.renderSession.offset;if(c.filterPasses.length>1){a.viewport(0,0,d.width*this.renderSession.resolution,d.height*this.renderSession.resolution),a.bindBuffer(a.ARRAY_BUFFER,this.vertexBuffer),this.vertexArray[0]=0,this.vertexArray[1]=d.height,this.vertexArray[2]=d.width,this.vertexArray[3]=d.height,this.vertexArray[4]=0,this.vertexArray[5]=0,this.vertexArray[6]=d.width,this.vertexArray[7]=0,a.bufferSubData(a.ARRAY_BUFFER,0,this.vertexArray),a.bindBuffer(a.ARRAY_BUFFER,this.uvBuffer),this.uvArray[2]=d.width/this.width,this.uvArray[5]=d.height/this.height,this.uvArray[6]=d.width/this.width,this.uvArray[7]=d.height/this.height,a.bufferSubData(a.ARRAY_BUFFER,0,this.uvArray);var h=e,i=this.texturePool.pop();i||(i=new b.FilterTexture(this.gl,this.width*this.renderSession.resolution,this.height*this.renderSession.resolution)),i.resize(this.width*this.renderSession.resolution,this.height*this.renderSession.resolution),a.bindFramebuffer(a.FRAMEBUFFER,i.frameBuffer),a.clear(a.COLOR_BUFFER_BIT),a.disable(a.BLEND);for(var j=0;j<c.filterPasses.length-1;j++){var k=c.filterPasses[j];a.bindFramebuffer(a.FRAMEBUFFER,i.frameBuffer),a.activeTexture(a.TEXTURE0),a.bindTexture(a.TEXTURE_2D,h.texture),this.applyFilterPass(k,d,d.width,d.height);var l=h;h=i,i=l}a.enable(a.BLEND),e=h,this.texturePool.push(i)}var m=c.filterPasses[c.filterPasses.length-1];this.offsetX-=d.x,this.offsetY-=d.y;var n=this.width,o=this.height,p=0,q=0,r=this.buffer;if(0===this.filterStack.length)a.colorMask(!0,!0,!0,!0);else{var s=this.filterStack[this.filterStack.length-1];d=s._filterArea,n=d.width,o=d.height,p=d.x,q=d.y,r=s._glFilterTexture.frameBuffer}f.x=n/2,f.y=-o/2,g.x=p,g.y=q,d=c._filterArea;var t=d.x-p,u=d.y-q;a.bindBuffer(a.ARRAY_BUFFER,this.vertexBuffer),this.vertexArray[0]=t,this.vertexArray[1]=u+d.height,this.vertexArray[2]=t+d.width,this.vertexArray[3]=u+d.height,this.vertexArray[4]=t,this.vertexArray[5]=u,this.vertexArray[6]=t+d.width,this.vertexArray[7]=u,a.bufferSubData(a.ARRAY_BUFFER,0,this.vertexArray),a.bindBuffer(a.ARRAY_BUFFER,this.uvBuffer),this.uvArray[2]=d.width/this.width,this.uvArray[5]=d.height/this.height,this.uvArray[6]=d.width/this.width,this.uvArray[7]=d.height/this.height,a.bufferSubData(a.ARRAY_BUFFER,0,this.uvArray),a.viewport(0,0,n*this.renderSession.resolution,o*this.renderSession.resolution),a.bindFramebuffer(a.FRAMEBUFFER,r),a.activeTexture(a.TEXTURE0),a.bindTexture(a.TEXTURE_2D,e.texture),this.renderSession.stencilManager&&this.renderSession.stencilManager.destroy(),this.renderSession.stencilManager=c._previous_stencil_mgr,c._previous_stencil_mgr=null,this.renderSession.stencilManager.count>0?a.enable(a.STENCIL_TEST):a.disable(a.STENCIL_TEST),this.applyFilterPass(m,d,n,o),this.texturePool.push(e),c._glFilterTexture=null},b.WebGLFilterManager.prototype.applyFilterPass=function(a,c,d,e){var f=this.gl,g=a.shaders[f.id];g||(g=new b.PixiShader(f),g.fragmentSrc=a.fragmentSrc,g.uniforms=a.uniforms,g.init(),a.shaders[f.id]=g),this.renderSession.shaderManager.setShader(g),f.uniform2f(g.projectionVector,d/2,-e/2),f.uniform2f(g.offsetVector,0,0),a.uniforms.dimensions&&(a.uniforms.dimensions.value[0]=this.width,a.uniforms.dimensions.value[1]=this.height,a.uniforms.dimensions.value[2]=this.vertexArray[0],a.uniforms.dimensions.value[3]=this.vertexArray[5]),g.syncUniforms(),f.bindBuffer(f.ARRAY_BUFFER,this.vertexBuffer),f.vertexAttribPointer(g.aVertexPosition,2,f.FLOAT,!1,0,0),f.bindBuffer(f.ARRAY_BUFFER,this.uvBuffer),f.vertexAttribPointer(g.aTextureCoord,2,f.FLOAT,!1,0,0),f.bindBuffer(f.ARRAY_BUFFER,this.colorBuffer),f.vertexAttribPointer(g.colorAttribute,2,f.FLOAT,!1,0,0),f.bindBuffer(f.ELEMENT_ARRAY_BUFFER,this.indexBuffer),f.drawElements(f.TRIANGLES,6,f.UNSIGNED_SHORT,0),this.renderSession.drawCount++},b.WebGLFilterManager.prototype.initShaderBuffers=function(){var a=this.gl;this.vertexBuffer=a.createBuffer(),this.uvBuffer=a.createBuffer(),this.colorBuffer=a.createBuffer(),this.indexBuffer=a.createBuffer(),this.vertexArray=new b.Float32Array([0,0,1,0,0,1,1,1]),a.bindBuffer(a.ARRAY_BUFFER,this.vertexBuffer),a.bufferData(a.ARRAY_BUFFER,this.vertexArray,a.STATIC_DRAW),this.uvArray=new b.Float32Array([0,0,1,0,0,1,1,1]),a.bindBuffer(a.ARRAY_BUFFER,this.uvBuffer),a.bufferData(a.ARRAY_BUFFER,this.uvArray,a.STATIC_DRAW),this.colorArray=new b.Float32Array([1,16777215,1,16777215,1,16777215,1,16777215]),a.bindBuffer(a.ARRAY_BUFFER,this.colorBuffer),a.bufferData(a.ARRAY_BUFFER,this.colorArray,a.STATIC_DRAW),a.bindBuffer(a.ELEMENT_ARRAY_BUFFER,this.indexBuffer),a.bufferData(a.ELEMENT_ARRAY_BUFFER,new Uint16Array([0,1,2,1,3,2]),a.STATIC_DRAW)},b.WebGLFilterManager.prototype.destroy=function(){var a=this.gl;this.filterStack=null,this.offsetX=0,this.offsetY=0;for(var b=0;b<this.texturePool.length;b++)this.texturePool[b].destroy();this.texturePool=null,a.deleteBuffer(this.vertexBuffer),a.deleteBuffer(this.uvBuffer),a.deleteBuffer(this.colorBuffer),a.deleteBuffer(this.indexBuffer)},b.FilterTexture=function(a,c,d,e){this.gl=a,this.frameBuffer=a.createFramebuffer(),this.texture=a.createTexture(),e=e||b.scaleModes.DEFAULT,a.bindTexture(a.TEXTURE_2D,this.texture),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MAG_FILTER,e===b.scaleModes.LINEAR?a.LINEAR:a.NEAREST),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MIN_FILTER,e===b.scaleModes.LINEAR?a.LINEAR:a.NEAREST),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_WRAP_S,a.CLAMP_TO_EDGE),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_WRAP_T,a.CLAMP_TO_EDGE),a.bindFramebuffer(a.FRAMEBUFFER,this.frameBuffer),a.bindFramebuffer(a.FRAMEBUFFER,this.frameBuffer),a.framebufferTexture2D(a.FRAMEBUFFER,a.COLOR_ATTACHMENT0,a.TEXTURE_2D,this.texture,0),this.renderBuffer=a.createRenderbuffer(),a.bindRenderbuffer(a.RENDERBUFFER,this.renderBuffer),a.framebufferRenderbuffer(a.FRAMEBUFFER,a.DEPTH_STENCIL_ATTACHMENT,a.RENDERBUFFER,this.renderBuffer),this.resize(c,d)},b.FilterTexture.prototype.constructor=b.FilterTexture,b.FilterTexture.prototype.clear=function(){var a=this.gl;a.clearColor(0,0,0,0),a.clear(a.COLOR_BUFFER_BIT)},b.FilterTexture.prototype.resize=function(a,b){if(this.width!==a||this.height!==b){this.width=a,this.height=b;var c=this.gl;c.bindTexture(c.TEXTURE_2D,this.texture),c.texImage2D(c.TEXTURE_2D,0,c.RGBA,a,b,0,c.RGBA,c.UNSIGNED_BYTE,null),c.bindRenderbuffer(c.RENDERBUFFER,this.renderBuffer),c.renderbufferStorage(c.RENDERBUFFER,c.DEPTH_STENCIL,a,b)}},b.FilterTexture.prototype.destroy=function(){var a=this.gl;a.deleteFramebuffer(this.frameBuffer),a.deleteTexture(this.texture),this.frameBuffer=null,this.texture=null},b.CanvasBuffer=function(a,c){this.width=a,this.height=c,this.canvas=b.CanvasPool.create(this,this.width,this.height),this.context=this.canvas.getContext("2d"),this.canvas.width=a,this.canvas.height=c},b.CanvasBuffer.prototype.constructor=b.CanvasBuffer,b.CanvasBuffer.prototype.clear=function(){this.context.setTransform(1,0,0,1,0,0),this.context.clearRect(0,0,this.width,this.height)},b.CanvasBuffer.prototype.resize=function(a,b){this.width=this.canvas.width=a,this.height=this.canvas.height=b},b.CanvasBuffer.prototype.destroy=function(){b.CanvasPool.remove(this)},b.CanvasMaskManager=function(){},b.CanvasMaskManager.prototype.constructor=b.CanvasMaskManager,b.CanvasMaskManager.prototype.pushMask=function(a,c){var d=c.context;d.save();var e=a.alpha,f=a.worldTransform,g=c.resolution;d.setTransform(f.a*g,f.b*g,f.c*g,f.d*g,f.tx*g,f.ty*g),b.CanvasGraphics.renderGraphicsMask(a,d),d.clip(),a.worldAlpha=e},b.CanvasMaskManager.prototype.popMask=function(a){a.context.restore()},b.CanvasTinter=function(){},b.CanvasTinter.getTintedTexture=function(a,c){var d=a.tintedTexture||b.CanvasPool.create(this);return b.CanvasTinter.tintMethod(a.texture,c,d),d},b.CanvasTinter.tintWithMultiply=function(a,b,c){var d=c.getContext("2d"),e=a.crop;c.width===e.width&&c.height===e.height||(c.width=e.width,c.height=e.height),d.clearRect(0,0,e.width,e.height),d.fillStyle="#"+("00000"+(0|b).toString(16)).substr(-6),d.fillRect(0,0,e.width,e.height),d.globalCompositeOperation="multiply",d.drawImage(a.baseTexture.source,e.x,e.y,e.width,e.height,0,0,e.width,e.height),d.globalCompositeOperation="destination-atop",d.drawImage(a.baseTexture.source,e.x,e.y,e.width,e.height,0,0,e.width,e.height)},b.CanvasTinter.tintWithPerPixel=function(a,c,d){var e=d.getContext("2d"),f=a.crop;d.width=f.width,d.height=f.height,e.globalCompositeOperation="copy",e.drawImage(a.baseTexture.source,f.x,f.y,f.width,f.height,0,0,f.width,f.height);for(var g=b.hex2rgb(c),h=g[0],i=g[1],j=g[2],k=e.getImageData(0,0,f.width,f.height),l=k.data,m=0;m<l.length;m+=4)if(l[m+0]*=h,l[m+1]*=i,l[m+2]*=j,!b.CanvasTinter.canHandleAlpha){var n=l[m+3];l[m+0]/=255/n,l[m+1]/=255/n,l[m+2]/=255/n}e.putImageData(k,0,0)},b.CanvasTinter.checkInverseAlpha=function(){var a=new b.CanvasBuffer(2,1);a.context.fillStyle="rgba(10, 20, 30, 0.5)",a.context.fillRect(0,0,1,1);var c=a.context.getImageData(0,0,1,1);if(null===c)return!1;a.context.putImageData(c,1,0);
var d=a.context.getImageData(1,0,1,1);return d.data[0]===c.data[0]&&d.data[1]===c.data[1]&&d.data[2]===c.data[2]&&d.data[3]===c.data[3]},b.CanvasTinter.canHandleAlpha=b.CanvasTinter.checkInverseAlpha(),b.CanvasTinter.canUseMultiply=b.canUseNewCanvasBlendModes(),b.CanvasTinter.tintMethod=b.CanvasTinter.canUseMultiply?b.CanvasTinter.tintWithMultiply:b.CanvasTinter.tintWithPerPixel,b.CanvasRenderer=function(a){this.game=a,b.defaultRenderer||(b.defaultRenderer=this),this.type=b.CANVAS_RENDERER,this.resolution=a.resolution,this.clearBeforeRender=a.clearBeforeRender,this.transparent=a.transparent,this.autoResize=!1,this.width=a.width*this.resolution,this.height=a.height*this.resolution,this.view=a.canvas,this.context=this.view.getContext("2d",{alpha:this.transparent}),this.refresh=!0,this.count=0,this.maskManager=new b.CanvasMaskManager,this.renderSession={context:this.context,maskManager:this.maskManager,scaleMode:null,smoothProperty:Phaser.Canvas.getSmoothingPrefix(this.context),roundPixels:!1},this.mapBlendModes(),this.resize(this.width,this.height)},b.CanvasRenderer.prototype.constructor=b.CanvasRenderer,b.CanvasRenderer.prototype.render=function(a){this.context.setTransform(1,0,0,1,0,0),this.context.globalAlpha=1,this.renderSession.currentBlendMode=0,this.renderSession.shakeX=this.game.camera._shake.x,this.renderSession.shakeY=this.game.camera._shake.y,this.context.globalCompositeOperation="source-over",navigator.isCocoonJS&&this.view.screencanvas&&(this.context.fillStyle="black",this.context.clear()),this.clearBeforeRender&&(this.transparent?this.context.clearRect(0,0,this.width,this.height):a._bgColor&&(this.context.fillStyle=a._bgColor.rgba,this.context.fillRect(0,0,this.width,this.height))),this.renderDisplayObject(a)},b.CanvasRenderer.prototype.destroy=function(a){void 0===a&&(a=!0),a&&this.view.parent&&this.view.parent.removeChild(this.view),this.view=null,this.context=null,this.maskManager=null,this.renderSession=null},b.CanvasRenderer.prototype.resize=function(a,c){this.width=a*this.resolution,this.height=c*this.resolution,this.view.width=this.width,this.view.height=this.height,this.autoResize&&(this.view.style.width=this.width/this.resolution+"px",this.view.style.height=this.height/this.resolution+"px"),this.renderSession.smoothProperty&&(this.context[this.renderSession.smoothProperty]=this.renderSession.scaleMode===b.scaleModes.LINEAR)},b.CanvasRenderer.prototype.renderDisplayObject=function(a,b,c){this.renderSession.context=b||this.context,this.renderSession.resolution=this.resolution,a._renderCanvas(this.renderSession,c)},b.CanvasRenderer.prototype.mapBlendModes=function(){if(!b.blendModesCanvas){var a=[],c=b.blendModes,d=b.canUseNewCanvasBlendModes();a[c.NORMAL]="source-over",a[c.ADD]="lighter",a[c.MULTIPLY]=d?"multiply":"source-over",a[c.SCREEN]=d?"screen":"source-over",a[c.OVERLAY]=d?"overlay":"source-over",a[c.DARKEN]=d?"darken":"source-over",a[c.LIGHTEN]=d?"lighten":"source-over",a[c.COLOR_DODGE]=d?"color-dodge":"source-over",a[c.COLOR_BURN]=d?"color-burn":"source-over",a[c.HARD_LIGHT]=d?"hard-light":"source-over",a[c.SOFT_LIGHT]=d?"soft-light":"source-over",a[c.DIFFERENCE]=d?"difference":"source-over",a[c.EXCLUSION]=d?"exclusion":"source-over",a[c.HUE]=d?"hue":"source-over",a[c.SATURATION]=d?"saturation":"source-over",a[c.COLOR]=d?"color":"source-over",a[c.LUMINOSITY]=d?"luminosity":"source-over",b.blendModesCanvas=a}},b.BaseTexture=function(a,c){this.resolution=1,this.width=100,this.height=100,this.scaleMode=c||b.scaleModes.DEFAULT,this.hasLoaded=!1,this.source=a,this.premultipliedAlpha=!0,this._glTextures=[],this.mipmap=!1,this._dirty=[!0,!0,!0,!0],a&&((this.source.complete||this.source.getContext)&&this.source.width&&this.source.height&&(this.hasLoaded=!0,this.width=this.source.naturalWidth||this.source.width,this.height=this.source.naturalHeight||this.source.height,this.dirty()),this.skipRender=!1,this._powerOf2=!1)},b.BaseTexture.prototype.constructor=b.BaseTexture,b.BaseTexture.prototype.forceLoaded=function(a,b){this.hasLoaded=!0,this.width=a,this.height=b,this.dirty()},b.BaseTexture.prototype.destroy=function(){this.source&&b.CanvasPool.removeByCanvas(this.source),this.source=null,this.unloadFromGPU()},b.BaseTexture.prototype.updateSourceImage=function(a){console.warn("PIXI.BaseTexture.updateSourceImage is deprecated. Use Phaser.Sprite.loadTexture instead.")},b.BaseTexture.prototype.dirty=function(){for(var a=0;a<this._glTextures.length;a++)this._dirty[a]=!0},b.BaseTexture.prototype.unloadFromGPU=function(){this.dirty();for(var a=this._glTextures.length-1;a>=0;a--){var c=this._glTextures[a],d=b.glContexts[a];d&&c&&d.deleteTexture(c)}this._glTextures.length=0,this.dirty()},b.BaseTexture.fromCanvas=function(a,c){return 0===a.width&&(a.width=1),0===a.height&&(a.height=1),new b.BaseTexture(a,c)},b.TextureSilentFail=!1,b.Texture=function(a,c,d,e){this.noFrame=!1,c||(this.noFrame=!0,c=new b.Rectangle(0,0,1,1)),a instanceof b.Texture&&(a=a.baseTexture),this.baseTexture=a,this.frame=c,this.trim=e,this.valid=!1,this.isTiling=!1,this.requiresUpdate=!1,this.requiresReTint=!1,this._uvs=null,this.width=0,this.height=0,this.crop=d||new b.Rectangle(0,0,1,1),a.hasLoaded&&(this.noFrame&&(c=new b.Rectangle(0,0,a.width,a.height)),this.setFrame(c))},b.Texture.prototype.constructor=b.Texture,b.Texture.prototype.onBaseTextureLoaded=function(){var a=this.baseTexture;this.noFrame&&(this.frame=new b.Rectangle(0,0,a.width,a.height)),this.setFrame(this.frame)},b.Texture.prototype.destroy=function(a){a&&this.baseTexture.destroy(),this.valid=!1},b.Texture.prototype.setFrame=function(a){if(this.noFrame=!1,this.frame=a,this.width=a.width,this.height=a.height,this.crop.x=a.x,this.crop.y=a.y,this.crop.width=a.width,this.crop.height=a.height,!this.trim&&(a.x+a.width>this.baseTexture.width||a.y+a.height>this.baseTexture.height)){if(!b.TextureSilentFail)throw new Error("Texture Error: frame does not fit inside the base Texture dimensions "+this);return void(this.valid=!1)}this.valid=a&&a.width&&a.height&&this.baseTexture.source&&this.baseTexture.hasLoaded,this.trim&&(this.width=this.trim.width,this.height=this.trim.height,this.frame.width=this.trim.width,this.frame.height=this.trim.height),this.valid&&this._updateUvs()},b.Texture.prototype._updateUvs=function(){this._uvs||(this._uvs=new b.TextureUvs);var a=this.crop,c=this.baseTexture.width,d=this.baseTexture.height;this._uvs.x0=a.x/c,this._uvs.y0=a.y/d,this._uvs.x1=(a.x+a.width)/c,this._uvs.y1=a.y/d,this._uvs.x2=(a.x+a.width)/c,this._uvs.y2=(a.y+a.height)/d,this._uvs.x3=a.x/c,this._uvs.y3=(a.y+a.height)/d},b.Texture.fromCanvas=function(a,c){var d=b.BaseTexture.fromCanvas(a,c);return new b.Texture(d)},b.TextureUvs=function(){this.x0=0,this.y0=0,this.x1=0,this.y1=0,this.x2=0,this.y2=0,this.x3=0,this.y3=0},b.RenderTexture=function(a,c,d,e,f){if(this.width=a||100,this.height=c||100,this.resolution=f||1,this.frame=new b.Rectangle(0,0,this.width*this.resolution,this.height*this.resolution),this.crop=new b.Rectangle(0,0,this.width*this.resolution,this.height*this.resolution),this.baseTexture=new b.BaseTexture,this.baseTexture.width=this.width*this.resolution,this.baseTexture.height=this.height*this.resolution,this.baseTexture._glTextures=[],this.baseTexture.resolution=this.resolution,this.baseTexture.scaleMode=e||b.scaleModes.DEFAULT,this.baseTexture.hasLoaded=!0,b.Texture.call(this,this.baseTexture,new b.Rectangle(0,0,this.width*this.resolution,this.height*this.resolution)),this.renderer=d||b.defaultRenderer,this.renderer.type===b.WEBGL_RENDERER){var g=this.renderer.gl;this.baseTexture._dirty[g.id]=!1,this.textureBuffer=new b.FilterTexture(g,this.width,this.height,this.baseTexture.scaleMode),this.baseTexture._glTextures[g.id]=this.textureBuffer.texture,this.render=this.renderWebGL,this.projection=new b.Point(.5*this.width,.5*-this.height)}else this.render=this.renderCanvas,this.textureBuffer=new b.CanvasBuffer(this.width*this.resolution,this.height*this.resolution),this.baseTexture.source=this.textureBuffer.canvas;this.valid=!0,this.tempMatrix=new Phaser.Matrix,this._updateUvs()},b.RenderTexture.prototype=Object.create(b.Texture.prototype),b.RenderTexture.prototype.constructor=b.RenderTexture,b.RenderTexture.prototype.resize=function(a,c,d){a===this.width&&c===this.height||(this.valid=a>0&&c>0,this.width=a,this.height=c,this.frame.width=this.crop.width=a*this.resolution,this.frame.height=this.crop.height=c*this.resolution,d&&(this.baseTexture.width=this.width*this.resolution,this.baseTexture.height=this.height*this.resolution),this.renderer.type===b.WEBGL_RENDERER&&(this.projection.x=this.width/2,this.projection.y=-this.height/2),this.valid&&this.textureBuffer.resize(this.width,this.height))},b.RenderTexture.prototype.clear=function(){this.valid&&(this.renderer.type===b.WEBGL_RENDERER&&this.renderer.gl.bindFramebuffer(this.renderer.gl.FRAMEBUFFER,this.textureBuffer.frameBuffer),this.textureBuffer.clear())},b.RenderTexture.prototype.renderWebGL=function(a,b,c){if(this.valid&&0!==a.alpha){var d=a.worldTransform;d.identity(),d.translate(0,2*this.projection.y),b&&d.append(b),d.scale(1,-1);for(var e=0;e<a.children.length;e++)a.children[e].updateTransform();var f=this.renderer.gl;f.viewport(0,0,this.width*this.resolution,this.height*this.resolution),f.bindFramebuffer(f.FRAMEBUFFER,this.textureBuffer.frameBuffer),c&&this.textureBuffer.clear(),this.renderer.spriteBatch.dirty=!0,this.renderer.renderDisplayObject(a,this.projection,this.textureBuffer.frameBuffer,b),this.renderer.spriteBatch.dirty=!0}},b.RenderTexture.prototype.renderCanvas=function(a,b,c){if(this.valid&&0!==a.alpha){var d=a.worldTransform;d.identity(),b&&d.append(b);for(var e=0;e<a.children.length;e++)a.children[e].updateTransform();c&&this.textureBuffer.clear();var f=this.renderer.resolution;this.renderer.resolution=this.resolution,this.renderer.renderDisplayObject(a,this.textureBuffer.context,b),this.renderer.resolution=f}},b.RenderTexture.prototype.getImage=function(){var a=new Image;return a.src=this.getBase64(),a},b.RenderTexture.prototype.getBase64=function(){return this.getCanvas().toDataURL()},b.RenderTexture.prototype.getCanvas=function(){if(this.renderer.type===b.WEBGL_RENDERER){var a=this.renderer.gl,c=this.textureBuffer.width,d=this.textureBuffer.height,e=new Uint8Array(4*c*d);a.bindFramebuffer(a.FRAMEBUFFER,this.textureBuffer.frameBuffer),a.readPixels(0,0,c,d,a.RGBA,a.UNSIGNED_BYTE,e),a.bindFramebuffer(a.FRAMEBUFFER,null);var f=new b.CanvasBuffer(c,d),g=f.context.getImageData(0,0,c,d);return g.data.set(e),f.context.putImageData(g,0,0),f.canvas}return this.textureBuffer.canvas},b.AbstractFilter=function(a,b){this.passes=[this],this.shaders=[],this.dirty=!0,this.padding=0,this.uniforms=b||{},this.fragmentSrc=a||[]},b.AbstractFilter.prototype.constructor=b.AbstractFilter,b.AbstractFilter.prototype.syncUniforms=function(){for(var a=0,b=this.shaders.length;a<b;a++)this.shaders[a].dirty=!0},b.Strip=function(a){b.DisplayObjectContainer.call(this),this.texture=a,this.uvs=new b.Float32Array([0,1,1,1,1,0,0,1]),this.vertices=new b.Float32Array([0,0,100,0,100,100,0,100]),this.colors=new b.Float32Array([1,1,1,1]),this.indices=new b.Uint16Array([0,1,2,3]),this.dirty=!0,this.blendMode=b.blendModes.NORMAL,this.canvasPadding=0,this.drawMode=b.Strip.DrawModes.TRIANGLE_STRIP},b.Strip.prototype=Object.create(b.DisplayObjectContainer.prototype),b.Strip.prototype.constructor=b.Strip,b.Strip.prototype._renderWebGL=function(a){!this.visible||this.alpha<=0||(a.spriteBatch.stop(),this._vertexBuffer||this._initWebGL(a),a.shaderManager.setShader(a.shaderManager.stripShader),this._renderStrip(a),a.spriteBatch.start())},b.Strip.prototype._initWebGL=function(a){var b=a.gl;this._vertexBuffer=b.createBuffer(),this._indexBuffer=b.createBuffer(),this._uvBuffer=b.createBuffer(),this._colorBuffer=b.createBuffer(),b.bindBuffer(b.ARRAY_BUFFER,this._vertexBuffer),b.bufferData(b.ARRAY_BUFFER,this.vertices,b.DYNAMIC_DRAW),b.bindBuffer(b.ARRAY_BUFFER,this._uvBuffer),b.bufferData(b.ARRAY_BUFFER,this.uvs,b.STATIC_DRAW),b.bindBuffer(b.ARRAY_BUFFER,this._colorBuffer),b.bufferData(b.ARRAY_BUFFER,this.colors,b.STATIC_DRAW),b.bindBuffer(b.ELEMENT_ARRAY_BUFFER,this._indexBuffer),b.bufferData(b.ELEMENT_ARRAY_BUFFER,this.indices,b.STATIC_DRAW)},b.Strip.prototype._renderStrip=function(a){var c=a.gl,d=a.projection,e=a.offset,f=a.shaderManager.stripShader,g=this.drawMode===b.Strip.DrawModes.TRIANGLE_STRIP?c.TRIANGLE_STRIP:c.TRIANGLES;a.blendModeManager.setBlendMode(this.blendMode),c.uniformMatrix3fv(f.translationMatrix,!1,this.worldTransform.toArray(!0)),c.uniform2f(f.projectionVector,d.x,-d.y),c.uniform2f(f.offsetVector,-e.x,-e.y),c.uniform1f(f.alpha,this.worldAlpha),this.dirty?(this.dirty=!1,c.bindBuffer(c.ARRAY_BUFFER,this._vertexBuffer),c.bufferData(c.ARRAY_BUFFER,this.vertices,c.STATIC_DRAW),c.vertexAttribPointer(f.aVertexPosition,2,c.FLOAT,!1,0,0),c.bindBuffer(c.ARRAY_BUFFER,this._uvBuffer),c.bufferData(c.ARRAY_BUFFER,this.uvs,c.STATIC_DRAW),c.vertexAttribPointer(f.aTextureCoord,2,c.FLOAT,!1,0,0),c.activeTexture(c.TEXTURE0),this.texture.baseTexture._dirty[c.id]?a.renderer.updateTexture(this.texture.baseTexture):c.bindTexture(c.TEXTURE_2D,this.texture.baseTexture._glTextures[c.id]),c.bindBuffer(c.ELEMENT_ARRAY_BUFFER,this._indexBuffer),c.bufferData(c.ELEMENT_ARRAY_BUFFER,this.indices,c.STATIC_DRAW)):(c.bindBuffer(c.ARRAY_BUFFER,this._vertexBuffer),c.bufferSubData(c.ARRAY_BUFFER,0,this.vertices),c.vertexAttribPointer(f.aVertexPosition,2,c.FLOAT,!1,0,0),c.bindBuffer(c.ARRAY_BUFFER,this._uvBuffer),c.vertexAttribPointer(f.aTextureCoord,2,c.FLOAT,!1,0,0),c.activeTexture(c.TEXTURE0),this.texture.baseTexture._dirty[c.id]?a.renderer.updateTexture(this.texture.baseTexture):c.bindTexture(c.TEXTURE_2D,this.texture.baseTexture._glTextures[c.id]),c.bindBuffer(c.ELEMENT_ARRAY_BUFFER,this._indexBuffer)),c.drawElements(g,this.indices.length,c.UNSIGNED_SHORT,0)},b.Strip.prototype._renderCanvas=function(a){var c=a.context,d=this.worldTransform,e=d.tx*a.resolution+a.shakeX,f=d.ty*a.resolution+a.shakeY;a.roundPixels?c.setTransform(d.a,d.b,d.c,d.d,0|e,0|f):c.setTransform(d.a,d.b,d.c,d.d,e,f),this.drawMode===b.Strip.DrawModes.TRIANGLE_STRIP?this._renderCanvasTriangleStrip(c):this._renderCanvasTriangles(c)},b.Strip.prototype._renderCanvasTriangleStrip=function(a){var b=this.vertices,c=this.uvs,d=b.length/2;this.count++;for(var e=0;e<d-2;e++){var f=2*e;this._renderCanvasDrawTriangle(a,b,c,f,f+2,f+4)}},b.Strip.prototype._renderCanvasTriangles=function(a){var b=this.vertices,c=this.uvs,d=this.indices,e=d.length;this.count++;for(var f=0;f<e;f+=3){var g=2*d[f],h=2*d[f+1],i=2*d[f+2];this._renderCanvasDrawTriangle(a,b,c,g,h,i)}},b.Strip.prototype._renderCanvasDrawTriangle=function(a,b,c,d,e,f){var g=this.texture.baseTexture.source,h=this.texture.width,i=this.texture.height,j=b[d],k=b[e],l=b[f],m=b[d+1],n=b[e+1],o=b[f+1],p=c[d]*h,q=c[e]*h,r=c[f]*h,s=c[d+1]*i,t=c[e+1]*i,u=c[f+1]*i;if(this.canvasPadding>0){var v=this.canvasPadding/this.worldTransform.a,w=this.canvasPadding/this.worldTransform.d,x=(j+k+l)/3,y=(m+n+o)/3,z=j-x,A=m-y,B=Math.sqrt(z*z+A*A);j=x+z/B*(B+v),m=y+A/B*(B+w),z=k-x,A=n-y,B=Math.sqrt(z*z+A*A),k=x+z/B*(B+v),n=y+A/B*(B+w),z=l-x,A=o-y,B=Math.sqrt(z*z+A*A),l=x+z/B*(B+v),o=y+A/B*(B+w)}a.save(),a.beginPath(),a.moveTo(j,m),a.lineTo(k,n),a.lineTo(l,o),a.closePath(),a.clip();var C=p*t+s*r+q*u-t*r-s*q-p*u,D=j*t+s*l+k*u-t*l-s*k-j*u,E=p*k+j*r+q*l-k*r-j*q-p*l,F=p*t*l+s*k*r+j*q*u-j*t*r-s*q*l-p*k*u,G=m*t+s*o+n*u-t*o-s*n-m*u,H=p*n+m*r+q*o-n*r-m*q-p*o,I=p*t*o+s*n*r+m*q*u-m*t*r-s*q*o-p*n*u;a.transform(D/C,G/C,E/C,H/C,F/C,I/C),a.drawImage(g,0,0),a.restore()},b.Strip.prototype.renderStripFlat=function(a){var b=this.context,c=a.vertices,d=c.length/2;this.count++,b.beginPath();for(var e=1;e<d-2;e++){var f=2*e,g=c[f],h=c[f+2],i=c[f+4],j=c[f+1],k=c[f+3],l=c[f+5];b.moveTo(g,j),b.lineTo(h,k),b.lineTo(i,l)}b.fillStyle="#FF0000",b.fill(),b.closePath()},b.Strip.prototype.onTextureUpdate=function(){this.updateFrame=!0},b.Strip.prototype.getBounds=function(a){for(var c=a||this.worldTransform,d=c.a,e=c.b,f=c.c,g=c.d,h=c.tx,i=c.ty,j=-(1/0),k=-(1/0),l=1/0,m=1/0,n=this.vertices,o=0,p=n.length;o<p;o+=2){var q=n[o],r=n[o+1],s=d*q+f*r+h,t=g*r+e*q+i;l=s<l?s:l,m=t<m?t:m,j=s>j?s:j,k=t>k?t:k}if(l===-(1/0)||k===1/0)return b.EmptyRectangle;var u=this._bounds;return u.x=l,u.width=j-l,u.y=m,u.height=k-m,this._currentBounds=u,u},b.Strip.DrawModes={TRIANGLE_STRIP:0,TRIANGLES:1},b.Rope=function(a,c){b.Strip.call(this,a),this.points=c,this.vertices=new b.Float32Array(4*c.length),this.uvs=new b.Float32Array(4*c.length),this.colors=new b.Float32Array(2*c.length),this.indices=new b.Uint16Array(2*c.length),this.refresh()},b.Rope.prototype=Object.create(b.Strip.prototype),b.Rope.prototype.constructor=b.Rope,b.Rope.prototype.refresh=function(){var a=this.points;if(!(a.length<1)){var b=this.uvs,c=a[0],d=this.indices,e=this.colors;this.count-=.2,b[0]=0,b[1]=0,b[2]=0,b[3]=1,e[0]=1,e[1]=1,d[0]=0,d[1]=1;for(var f,g,h,i=a.length,j=1;j<i;j++)f=a[j],g=4*j,h=j/(i-1),j%2?(b[g]=h,b[g+1]=0,b[g+2]=h,b[g+3]=1):(b[g]=h,b[g+1]=0,b[g+2]=h,b[g+3]=1),g=2*j,e[g]=1,e[g+1]=1,g=2*j,d[g]=g,d[g+1]=g+1,c=f}},b.Rope.prototype.updateTransform=function(){var a=this.points;if(!(a.length<1)){var c,d=a[0],e={x:0,y:0};this.count-=.2;for(var f,g,h,i,j,k=this.vertices,l=a.length,m=0;m<l;m++)f=a[m],g=4*m,c=m<a.length-1?a[m+1]:f,e.y=-(c.x-d.x),e.x=c.y-d.y,h=10*(1-m/(l-1)),h>1&&(h=1),i=Math.sqrt(e.x*e.x+e.y*e.y),j=this.texture.height/2,e.x/=i,e.y/=i,e.x*=j,e.y*=j,k[g]=f.x+e.x,k[g+1]=f.y+e.y,k[g+2]=f.x-e.x,k[g+3]=f.y-e.y,d=f;b.DisplayObjectContainer.prototype.updateTransform.call(this)}},b.Rope.prototype.setTexture=function(a){this.texture=a},b.TilingSprite=function(a,c,d){b.Sprite.call(this,a),this._width=c||128,this._height=d||128,this.tileScale=new b.Point(1,1),this.tileScaleOffset=new b.Point(1,1),this.tilePosition=new b.Point,this.renderable=!0,this.tint=16777215,this.textureDebug=!1,this.blendMode=b.blendModes.NORMAL,this.canvasBuffer=null,this.tilingTexture=null,this.tilePattern=null,this.refreshTexture=!0,this.frameWidth=0,this.frameHeight=0},b.TilingSprite.prototype=Object.create(b.Sprite.prototype),b.TilingSprite.prototype.constructor=b.TilingSprite,b.TilingSprite.prototype.setTexture=function(a){this.texture!==a&&(this.texture=a,this.refreshTexture=!0,this.cachedTint=16777215)},b.TilingSprite.prototype._renderWebGL=function(a){if(this.visible&&this.renderable&&0!==this.alpha){if(this._mask&&(a.spriteBatch.stop(),a.maskManager.pushMask(this.mask,a),a.spriteBatch.start()),this._filters&&(a.spriteBatch.flush(),a.filterManager.pushFilter(this._filterBlock)),this.refreshTexture){if(this.generateTilingTexture(!0,a),!this.tilingTexture)return;this.tilingTexture.needsUpdate&&(a.renderer.updateTexture(this.tilingTexture.baseTexture),this.tilingTexture.needsUpdate=!1)}a.spriteBatch.renderTilingSprite(this);for(var b=0;b<this.children.length;b++)this.children[b]._renderWebGL(a);a.spriteBatch.stop(),this._filters&&a.filterManager.popFilter(),this._mask&&a.maskManager.popMask(this._mask,a),a.spriteBatch.start()}},b.TilingSprite.prototype._renderCanvas=function(a){if(this.visible&&this.renderable&&0!==this.alpha){var c=a.context;this._mask&&a.maskManager.pushMask(this._mask,a),c.globalAlpha=this.worldAlpha;var d=this.worldTransform,e=a.resolution,f=d.tx*e+a.shakeX,g=d.ty*e+a.shakeY;if(c.setTransform(d.a*e,d.b*e,d.c*e,d.d*e,f,g),this.refreshTexture){if(this.generateTilingTexture(!1,a),!this.tilingTexture)return;this.tilePattern=c.createPattern(this.tilingTexture.baseTexture.source,"repeat")}var h=a.currentBlendMode;this.blendMode!==a.currentBlendMode&&(a.currentBlendMode=this.blendMode,c.globalCompositeOperation=b.blendModesCanvas[a.currentBlendMode]);var i=this.tilePosition,j=this.tileScale;i.x%=this.tilingTexture.baseTexture.width,i.y%=this.tilingTexture.baseTexture.height,c.scale(j.x,j.y),c.translate(i.x+this.anchor.x*-this._width,i.y+this.anchor.y*-this._height),c.fillStyle=this.tilePattern;var f=-i.x,g=-i.y,k=this._width/j.x,l=this._height/j.y;a.roundPixels&&(f|=0,g|=0,k|=0,l|=0),c.fillRect(f,g,k,l),c.scale(1/j.x,1/j.y),c.translate(-i.x+this.anchor.x*this._width,-i.y+this.anchor.y*this._height),this._mask&&a.maskManager.popMask(a);for(var m=0;m<this.children.length;m++)this.children[m]._renderCanvas(a);h!==this.blendMode&&(a.currentBlendMode=h,c.globalCompositeOperation=b.blendModesCanvas[h])}},b.TilingSprite.prototype.onTextureUpdate=function(){},b.TilingSprite.prototype.generateTilingTexture=function(a,c){if(this.texture.baseTexture.hasLoaded){var d=this.texture,e=d.frame,f=this._frame.sourceSizeW||this._frame.width,g=this._frame.sourceSizeH||this._frame.height,h=0,i=0;this._frame.trimmed&&(h=this._frame.spriteSourceSizeX,i=this._frame.spriteSourceSizeY),a&&(f=b.getNextPowerOfTwo(f),g=b.getNextPowerOfTwo(g)),this.canvasBuffer?(this.canvasBuffer.resize(f,g),this.tilingTexture.baseTexture.width=f,this.tilingTexture.baseTexture.height=g,this.tilingTexture.needsUpdate=!0):(this.canvasBuffer=new b.CanvasBuffer(f,g),this.tilingTexture=b.Texture.fromCanvas(this.canvasBuffer.canvas),this.tilingTexture.isTiling=!0,this.tilingTexture.needsUpdate=!0),this.textureDebug&&(this.canvasBuffer.context.strokeStyle="#00ff00",this.canvasBuffer.context.strokeRect(0,0,f,g));var j=d.crop.width,k=d.crop.height;j===f&&k===g||(j=f,k=g),this.canvasBuffer.context.drawImage(d.baseTexture.source,d.crop.x,d.crop.y,d.crop.width,d.crop.height,h,i,j,k),this.tileScaleOffset.x=e.width/f,this.tileScaleOffset.y=e.height/g,this.refreshTexture=!1,this.tilingTexture.baseTexture._powerOf2=!0}},b.TilingSprite.prototype.getBounds=function(){var a=this._width,b=this._height,c=a*(1-this.anchor.x),d=a*-this.anchor.x,e=b*(1-this.anchor.y),f=b*-this.anchor.y,g=this.worldTransform,h=g.a,i=g.b,j=g.c,k=g.d,l=g.tx,m=g.ty,n=h*d+j*f+l,o=k*f+i*d+m,p=h*c+j*f+l,q=k*f+i*c+m,r=h*c+j*e+l,s=k*e+i*c+m,t=h*d+j*e+l,u=k*e+i*d+m,v=-(1/0),w=-(1/0),x=1/0,y=1/0;x=n<x?n:x,x=p<x?p:x,x=r<x?r:x,x=t<x?t:x,y=o<y?o:y,y=q<y?q:y,y=s<y?s:y,y=u<y?u:y,v=n>v?n:v,v=p>v?p:v,v=r>v?r:v,v=t>v?t:v,w=o>w?o:w,w=q>w?q:w,w=s>w?s:w,w=u>w?u:w;var z=this._bounds;return z.x=x,z.width=v-x,z.y=y,z.height=w-y,this._currentBounds=z,z},b.TilingSprite.prototype.destroy=function(){b.Sprite.prototype.destroy.call(this),this.canvasBuffer&&(this.canvasBuffer.destroy(),this.canvasBuffer=null),this.tileScale=null,this.tileScaleOffset=null,this.tilePosition=null,this.tilingTexture&&(this.tilingTexture.destroy(!0),this.tilingTexture=null)},Object.defineProperty(b.TilingSprite.prototype,"width",{get:function(){return this._width},set:function(a){this._width=a}}),Object.defineProperty(b.TilingSprite.prototype,"height",{get:function(){return this._height},set:function(a){this._height=a}}),"undefined"!=typeof exports?("undefined"!=typeof module&&module.exports&&(exports=module.exports=b),exports.PIXI=b):"undefined"!=typeof define&&define.amd?define("PIXI",function(){return a.PIXI=b}()):a.PIXI=b,b}).call(this);
//# sourceMappingURL=pixi.map
(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
'use strict'

exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function placeHoldersCount (b64) {
  var len = b64.length
  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // the number of equal signs (place holders)
  // if there are two placeholders, than the two characters before it
  // represent one byte
  // if there is only one, then the three characters before it represent 2 bytes
  // this is just a cheap hack to not do indexOf twice
  return b64[len - 2] === '=' ? 2 : b64[len - 1] === '=' ? 1 : 0
}

function byteLength (b64) {
  // base64 is 4/3 + up to two characters of the original data
  return (b64.length * 3 / 4) - placeHoldersCount(b64)
}

function toByteArray (b64) {
  var i, l, tmp, placeHolders, arr
  var len = b64.length
  placeHolders = placeHoldersCount(b64)

  arr = new Arr((len * 3 / 4) - placeHolders)

  // if there are placeholders, only get up to the last complete 4 chars
  l = placeHolders > 0 ? len - 4 : len

  var L = 0

  for (i = 0; i < l; i += 4) {
    tmp = (revLookup[b64.charCodeAt(i)] << 18) | (revLookup[b64.charCodeAt(i + 1)] << 12) | (revLookup[b64.charCodeAt(i + 2)] << 6) | revLookup[b64.charCodeAt(i + 3)]
    arr[L++] = (tmp >> 16) & 0xFF
    arr[L++] = (tmp >> 8) & 0xFF
    arr[L++] = tmp & 0xFF
  }

  if (placeHolders === 2) {
    tmp = (revLookup[b64.charCodeAt(i)] << 2) | (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[L++] = tmp & 0xFF
  } else if (placeHolders === 1) {
    tmp = (revLookup[b64.charCodeAt(i)] << 10) | (revLookup[b64.charCodeAt(i + 1)] << 4) | (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[L++] = (tmp >> 8) & 0xFF
    arr[L++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var output = ''
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    output += lookup[tmp >> 2]
    output += lookup[(tmp << 4) & 0x3F]
    output += '=='
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + (uint8[len - 1])
    output += lookup[tmp >> 10]
    output += lookup[(tmp >> 4) & 0x3F]
    output += lookup[(tmp << 2) & 0x3F]
    output += '='
  }

  parts.push(output)

  return parts.join('')
}

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/base64-js/index.js","/node_modules/base64-js")

},{"_process":4,"buffer":2}],2:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */

'use strict'

var base64 = require('base64-js')
var ieee754 = require('ieee754')

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

var K_MAX_LENGTH = 0x7fffffff
exports.kMaxLength = K_MAX_LENGTH

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Print warning and recommend using `buffer` v4.x which has an Object
 *               implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * We report that the browser does not support typed arrays if the are not subclassable
 * using __proto__. Firefox 4-29 lacks support for adding new properties to `Uint8Array`
 * (See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438). IE 10 lacks support
 * for __proto__ and has a buggy typed array implementation.
 */
Buffer.TYPED_ARRAY_SUPPORT = typedArraySupport()

if (!Buffer.TYPED_ARRAY_SUPPORT && typeof console !== 'undefined' &&
    typeof console.error === 'function') {
  console.error(
    'This browser lacks typed array (Uint8Array) support which is required by ' +
    '`buffer` v5.x. Use `buffer` v4.x if you require old browser support.'
  )
}

function typedArraySupport () {
  // Can typed array instances can be augmented?
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
    return arr.foo() === 42
  } catch (e) {
    return false
  }
}

function createBuffer (length) {
  if (length > K_MAX_LENGTH) {
    throw new RangeError('Invalid typed array length')
  }
  // Return an augmented `Uint8Array` instance
  var buf = new Uint8Array(length)
  buf.__proto__ = Buffer.prototype
  return buf
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(arg)
  }
  return from(arg, encodingOrOffset, length)
}

// Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
if (typeof Symbol !== 'undefined' && Symbol.species &&
    Buffer[Symbol.species] === Buffer) {
  Object.defineProperty(Buffer, Symbol.species, {
    value: null,
    configurable: true,
    enumerable: false,
    writable: false
  })
}

Buffer.poolSize = 8192 // not used by this implementation

function from (value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (isArrayBuffer(value)) {
    return fromArrayBuffer(value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(value, encodingOrOffset)
  }

  return fromObject(value)
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(value, encodingOrOffset, length)
}

// Note: Change prototype *after* Buffer.from is defined to workaround Chrome bug:
// https://github.com/feross/buffer/pull/148
Buffer.prototype.__proto__ = Uint8Array.prototype
Buffer.__proto__ = Uint8Array

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number')
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
  }
}

function alloc (size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(size).fill(fill, encoding)
      : createBuffer(size).fill(fill)
  }
  return createBuffer(size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(size, fill, encoding)
}

function allocUnsafe (size) {
  assertSize(size)
  return createBuffer(size < 0 ? 0 : checked(size) | 0)
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(size)
}

function fromString (string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding')
  }

  var length = byteLength(string, encoding) | 0
  var buf = createBuffer(length)

  var actual = buf.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    buf = buf.slice(0, actual)
  }

  return buf
}

function fromArrayLike (array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  var buf = createBuffer(length)
  for (var i = 0; i < length; i += 1) {
    buf[i] = array[i] & 255
  }
  return buf
}

function fromArrayBuffer (array, byteOffset, length) {
  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds')
  }

  var buf
  if (byteOffset === undefined && length === undefined) {
    buf = new Uint8Array(array)
  } else if (length === undefined) {
    buf = new Uint8Array(array, byteOffset)
  } else {
    buf = new Uint8Array(array, byteOffset, length)
  }

  // Return an augmented `Uint8Array` instance
  buf.__proto__ = Buffer.prototype
  return buf
}

function fromObject (obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    var buf = createBuffer(len)

    if (buf.length === 0) {
      return buf
    }

    obj.copy(buf, 0, 0, len)
    return buf
  }

  if (obj) {
    if (isArrayBufferView(obj) || 'length' in obj) {
      if (typeof obj.length !== 'number' || numberIsNaN(obj.length)) {
        return createBuffer(0)
      }
      return fromArrayLike(obj)
    }

    if (obj.type === 'Buffer' && Array.isArray(obj.data)) {
      return fromArrayLike(obj.data)
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
}

function checked (length) {
  // Note: cannot use `length < K_MAX_LENGTH` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= K_MAX_LENGTH) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + K_MAX_LENGTH.toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return b != null && b._isBuffer === true
}

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!Array.isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (isArrayBufferView(string) || isArrayBuffer(string)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string
  }

  var len = string.length
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// This property is used by `Buffer.isBuffer` (and the `is-buffer` npm package)
// to detect a Buffer instance. It's not possible to use `instanceof Buffer`
// reliably in a browserify context because there could be multiple different
// copies of the 'buffer' package in use. This method works even for Buffer
// instances that were created from another copy of the `buffer` package.
// See: https://github.com/feross/buffer/issues/154
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max) str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset  // Coerce to Number.
  if (numberIsNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (numberIsNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset >>> 0
    if (isFinite(length)) {
      length = length >>> 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + (bytes[i + 1] * 256))
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf = this.subarray(start, end)
  // Return an augmented `Uint8Array` instance
  newBuf.__proto__ = Buffer.prototype
  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  this[offset] = (value >>> 8)
  this[offset + 1] = (value & 0xff)
  return offset + 2
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  this[offset + 3] = (value >>> 24)
  this[offset + 2] = (value >>> 16)
  this[offset + 1] = (value >>> 8)
  this[offset] = (value & 0xff)
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  this[offset] = (value >>> 24)
  this[offset + 1] = (value >>> 16)
  this[offset + 2] = (value >>> 8)
  this[offset + 3] = (value & 0xff)
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    var limit = Math.pow(2, (8 * byteLength) - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    var limit = Math.pow(2, (8 * byteLength) - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  this[offset] = (value >>> 8)
  this[offset + 1] = (value & 0xff)
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  this[offset + 2] = (value >>> 16)
  this[offset + 3] = (value >>> 24)
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  this[offset] = (value >>> 24)
  this[offset + 1] = (value >>> 16)
  this[offset + 2] = (value >>> 8)
  this[offset + 3] = (value & 0xff)
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start
  var i

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else if (len < 1000) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if (code < 256) {
        val = code
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : new Buffer(val, encoding)
    var len = bytes.length
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = str.trim().replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

// ArrayBuffers from another context (i.e. an iframe) do not pass the `instanceof` check
// but they should be treated as valid. See: https://github.com/feross/buffer/issues/166
function isArrayBuffer (obj) {
  return obj instanceof ArrayBuffer ||
    (obj != null && obj.constructor != null && obj.constructor.name === 'ArrayBuffer' &&
      typeof obj.byteLength === 'number')
}

// Node 0.10 supports `ArrayBuffer` but lacks `ArrayBuffer.isView`
function isArrayBufferView (obj) {
  return (typeof ArrayBuffer.isView === 'function') && ArrayBuffer.isView(obj)
}

function numberIsNaN (obj) {
  return obj !== obj // eslint-disable-line no-self-compare
}

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/buffer/index.js","/node_modules/buffer")

},{"_process":4,"base64-js":1,"buffer":2,"ieee754":3}],3:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/ieee754/index.js","/node_modules/ieee754")

},{"_process":4,"buffer":2}],4:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/process/browser.js","/node_modules/process")

},{"_process":4,"buffer":2}],5:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
"use strict";

describe("A suite", function () {
  it("contains spec with an expectation", function () {
    expect(true).toBe(true);
  });
});

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/src/tests/tests.js","/src/tests")

},{"_process":4,"buffer":2}]},{},[5])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvYmFzZTY0LWpzL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2J1ZmZlci9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9pZWVlNzU0L2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qcyIsInNyYy90ZXN0cy90ZXN0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUNsSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUNsckRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQ3BGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDckxBLFNBQVMsU0FBVCxFQUFvQixZQUFXO0FBQzNCLEtBQUcsbUNBQUgsRUFBd0MsWUFBVztBQUNqRCxXQUFPLElBQVAsRUFBYSxJQUFiLENBQWtCLElBQWxCO0FBQ0QsR0FGRDtBQUdELENBSkgiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiJ3VzZSBzdHJpY3QnXG5cbmV4cG9ydHMuYnl0ZUxlbmd0aCA9IGJ5dGVMZW5ndGhcbmV4cG9ydHMudG9CeXRlQXJyYXkgPSB0b0J5dGVBcnJheVxuZXhwb3J0cy5mcm9tQnl0ZUFycmF5ID0gZnJvbUJ5dGVBcnJheVxuXG52YXIgbG9va3VwID0gW11cbnZhciByZXZMb29rdXAgPSBbXVxudmFyIEFyciA9IHR5cGVvZiBVaW50OEFycmF5ICE9PSAndW5kZWZpbmVkJyA/IFVpbnQ4QXJyYXkgOiBBcnJheVxuXG52YXIgY29kZSA9ICdBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OSsvJ1xuZm9yICh2YXIgaSA9IDAsIGxlbiA9IGNvZGUubGVuZ3RoOyBpIDwgbGVuOyArK2kpIHtcbiAgbG9va3VwW2ldID0gY29kZVtpXVxuICByZXZMb29rdXBbY29kZS5jaGFyQ29kZUF0KGkpXSA9IGlcbn1cblxucmV2TG9va3VwWyctJy5jaGFyQ29kZUF0KDApXSA9IDYyXG5yZXZMb29rdXBbJ18nLmNoYXJDb2RlQXQoMCldID0gNjNcblxuZnVuY3Rpb24gcGxhY2VIb2xkZXJzQ291bnQgKGI2NCkge1xuICB2YXIgbGVuID0gYjY0Lmxlbmd0aFxuICBpZiAobGVuICUgNCA+IDApIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgc3RyaW5nLiBMZW5ndGggbXVzdCBiZSBhIG11bHRpcGxlIG9mIDQnKVxuICB9XG5cbiAgLy8gdGhlIG51bWJlciBvZiBlcXVhbCBzaWducyAocGxhY2UgaG9sZGVycylcbiAgLy8gaWYgdGhlcmUgYXJlIHR3byBwbGFjZWhvbGRlcnMsIHRoYW4gdGhlIHR3byBjaGFyYWN0ZXJzIGJlZm9yZSBpdFxuICAvLyByZXByZXNlbnQgb25lIGJ5dGVcbiAgLy8gaWYgdGhlcmUgaXMgb25seSBvbmUsIHRoZW4gdGhlIHRocmVlIGNoYXJhY3RlcnMgYmVmb3JlIGl0IHJlcHJlc2VudCAyIGJ5dGVzXG4gIC8vIHRoaXMgaXMganVzdCBhIGNoZWFwIGhhY2sgdG8gbm90IGRvIGluZGV4T2YgdHdpY2VcbiAgcmV0dXJuIGI2NFtsZW4gLSAyXSA9PT0gJz0nID8gMiA6IGI2NFtsZW4gLSAxXSA9PT0gJz0nID8gMSA6IDBcbn1cblxuZnVuY3Rpb24gYnl0ZUxlbmd0aCAoYjY0KSB7XG4gIC8vIGJhc2U2NCBpcyA0LzMgKyB1cCB0byB0d28gY2hhcmFjdGVycyBvZiB0aGUgb3JpZ2luYWwgZGF0YVxuICByZXR1cm4gKGI2NC5sZW5ndGggKiAzIC8gNCkgLSBwbGFjZUhvbGRlcnNDb3VudChiNjQpXG59XG5cbmZ1bmN0aW9uIHRvQnl0ZUFycmF5IChiNjQpIHtcbiAgdmFyIGksIGwsIHRtcCwgcGxhY2VIb2xkZXJzLCBhcnJcbiAgdmFyIGxlbiA9IGI2NC5sZW5ndGhcbiAgcGxhY2VIb2xkZXJzID0gcGxhY2VIb2xkZXJzQ291bnQoYjY0KVxuXG4gIGFyciA9IG5ldyBBcnIoKGxlbiAqIDMgLyA0KSAtIHBsYWNlSG9sZGVycylcblxuICAvLyBpZiB0aGVyZSBhcmUgcGxhY2Vob2xkZXJzLCBvbmx5IGdldCB1cCB0byB0aGUgbGFzdCBjb21wbGV0ZSA0IGNoYXJzXG4gIGwgPSBwbGFjZUhvbGRlcnMgPiAwID8gbGVuIC0gNCA6IGxlblxuXG4gIHZhciBMID0gMFxuXG4gIGZvciAoaSA9IDA7IGkgPCBsOyBpICs9IDQpIHtcbiAgICB0bXAgPSAocmV2TG9va3VwW2I2NC5jaGFyQ29kZUF0KGkpXSA8PCAxOCkgfCAocmV2TG9va3VwW2I2NC5jaGFyQ29kZUF0KGkgKyAxKV0gPDwgMTIpIHwgKHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpICsgMildIDw8IDYpIHwgcmV2TG9va3VwW2I2NC5jaGFyQ29kZUF0KGkgKyAzKV1cbiAgICBhcnJbTCsrXSA9ICh0bXAgPj4gMTYpICYgMHhGRlxuICAgIGFycltMKytdID0gKHRtcCA+PiA4KSAmIDB4RkZcbiAgICBhcnJbTCsrXSA9IHRtcCAmIDB4RkZcbiAgfVxuXG4gIGlmIChwbGFjZUhvbGRlcnMgPT09IDIpIHtcbiAgICB0bXAgPSAocmV2TG9va3VwW2I2NC5jaGFyQ29kZUF0KGkpXSA8PCAyKSB8IChyZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSArIDEpXSA+PiA0KVxuICAgIGFycltMKytdID0gdG1wICYgMHhGRlxuICB9IGVsc2UgaWYgKHBsYWNlSG9sZGVycyA9PT0gMSkge1xuICAgIHRtcCA9IChyZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSldIDw8IDEwKSB8IChyZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSArIDEpXSA8PCA0KSB8IChyZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSArIDIpXSA+PiAyKVxuICAgIGFycltMKytdID0gKHRtcCA+PiA4KSAmIDB4RkZcbiAgICBhcnJbTCsrXSA9IHRtcCAmIDB4RkZcbiAgfVxuXG4gIHJldHVybiBhcnJcbn1cblxuZnVuY3Rpb24gdHJpcGxldFRvQmFzZTY0IChudW0pIHtcbiAgcmV0dXJuIGxvb2t1cFtudW0gPj4gMTggJiAweDNGXSArIGxvb2t1cFtudW0gPj4gMTIgJiAweDNGXSArIGxvb2t1cFtudW0gPj4gNiAmIDB4M0ZdICsgbG9va3VwW251bSAmIDB4M0ZdXG59XG5cbmZ1bmN0aW9uIGVuY29kZUNodW5rICh1aW50OCwgc3RhcnQsIGVuZCkge1xuICB2YXIgdG1wXG4gIHZhciBvdXRwdXQgPSBbXVxuICBmb3IgKHZhciBpID0gc3RhcnQ7IGkgPCBlbmQ7IGkgKz0gMykge1xuICAgIHRtcCA9ICh1aW50OFtpXSA8PCAxNikgKyAodWludDhbaSArIDFdIDw8IDgpICsgKHVpbnQ4W2kgKyAyXSlcbiAgICBvdXRwdXQucHVzaCh0cmlwbGV0VG9CYXNlNjQodG1wKSlcbiAgfVxuICByZXR1cm4gb3V0cHV0LmpvaW4oJycpXG59XG5cbmZ1bmN0aW9uIGZyb21CeXRlQXJyYXkgKHVpbnQ4KSB7XG4gIHZhciB0bXBcbiAgdmFyIGxlbiA9IHVpbnQ4Lmxlbmd0aFxuICB2YXIgZXh0cmFCeXRlcyA9IGxlbiAlIDMgLy8gaWYgd2UgaGF2ZSAxIGJ5dGUgbGVmdCwgcGFkIDIgYnl0ZXNcbiAgdmFyIG91dHB1dCA9ICcnXG4gIHZhciBwYXJ0cyA9IFtdXG4gIHZhciBtYXhDaHVua0xlbmd0aCA9IDE2MzgzIC8vIG11c3QgYmUgbXVsdGlwbGUgb2YgM1xuXG4gIC8vIGdvIHRocm91Z2ggdGhlIGFycmF5IGV2ZXJ5IHRocmVlIGJ5dGVzLCB3ZSdsbCBkZWFsIHdpdGggdHJhaWxpbmcgc3R1ZmYgbGF0ZXJcbiAgZm9yICh2YXIgaSA9IDAsIGxlbjIgPSBsZW4gLSBleHRyYUJ5dGVzOyBpIDwgbGVuMjsgaSArPSBtYXhDaHVua0xlbmd0aCkge1xuICAgIHBhcnRzLnB1c2goZW5jb2RlQ2h1bmsodWludDgsIGksIChpICsgbWF4Q2h1bmtMZW5ndGgpID4gbGVuMiA/IGxlbjIgOiAoaSArIG1heENodW5rTGVuZ3RoKSkpXG4gIH1cblxuICAvLyBwYWQgdGhlIGVuZCB3aXRoIHplcm9zLCBidXQgbWFrZSBzdXJlIHRvIG5vdCBmb3JnZXQgdGhlIGV4dHJhIGJ5dGVzXG4gIGlmIChleHRyYUJ5dGVzID09PSAxKSB7XG4gICAgdG1wID0gdWludDhbbGVuIC0gMV1cbiAgICBvdXRwdXQgKz0gbG9va3VwW3RtcCA+PiAyXVxuICAgIG91dHB1dCArPSBsb29rdXBbKHRtcCA8PCA0KSAmIDB4M0ZdXG4gICAgb3V0cHV0ICs9ICc9PSdcbiAgfSBlbHNlIGlmIChleHRyYUJ5dGVzID09PSAyKSB7XG4gICAgdG1wID0gKHVpbnQ4W2xlbiAtIDJdIDw8IDgpICsgKHVpbnQ4W2xlbiAtIDFdKVxuICAgIG91dHB1dCArPSBsb29rdXBbdG1wID4+IDEwXVxuICAgIG91dHB1dCArPSBsb29rdXBbKHRtcCA+PiA0KSAmIDB4M0ZdXG4gICAgb3V0cHV0ICs9IGxvb2t1cFsodG1wIDw8IDIpICYgMHgzRl1cbiAgICBvdXRwdXQgKz0gJz0nXG4gIH1cblxuICBwYXJ0cy5wdXNoKG91dHB1dClcblxuICByZXR1cm4gcGFydHMuam9pbignJylcbn1cbiIsIi8qIVxuICogVGhlIGJ1ZmZlciBtb2R1bGUgZnJvbSBub2RlLmpzLCBmb3IgdGhlIGJyb3dzZXIuXG4gKlxuICogQGF1dGhvciAgIEZlcm9zcyBBYm91a2hhZGlqZWggPGZlcm9zc0BmZXJvc3Mub3JnPiA8aHR0cDovL2Zlcm9zcy5vcmc+XG4gKiBAbGljZW5zZSAgTUlUXG4gKi9cbi8qIGVzbGludC1kaXNhYmxlIG5vLXByb3RvICovXG5cbid1c2Ugc3RyaWN0J1xuXG52YXIgYmFzZTY0ID0gcmVxdWlyZSgnYmFzZTY0LWpzJylcbnZhciBpZWVlNzU0ID0gcmVxdWlyZSgnaWVlZTc1NCcpXG5cbmV4cG9ydHMuQnVmZmVyID0gQnVmZmVyXG5leHBvcnRzLlNsb3dCdWZmZXIgPSBTbG93QnVmZmVyXG5leHBvcnRzLklOU1BFQ1RfTUFYX0JZVEVTID0gNTBcblxudmFyIEtfTUFYX0xFTkdUSCA9IDB4N2ZmZmZmZmZcbmV4cG9ydHMua01heExlbmd0aCA9IEtfTUFYX0xFTkdUSFxuXG4vKipcbiAqIElmIGBCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVGA6XG4gKiAgID09PSB0cnVlICAgIFVzZSBVaW50OEFycmF5IGltcGxlbWVudGF0aW9uIChmYXN0ZXN0KVxuICogICA9PT0gZmFsc2UgICBQcmludCB3YXJuaW5nIGFuZCByZWNvbW1lbmQgdXNpbmcgYGJ1ZmZlcmAgdjQueCB3aGljaCBoYXMgYW4gT2JqZWN0XG4gKiAgICAgICAgICAgICAgIGltcGxlbWVudGF0aW9uIChtb3N0IGNvbXBhdGlibGUsIGV2ZW4gSUU2KVxuICpcbiAqIEJyb3dzZXJzIHRoYXQgc3VwcG9ydCB0eXBlZCBhcnJheXMgYXJlIElFIDEwKywgRmlyZWZveCA0KywgQ2hyb21lIDcrLCBTYWZhcmkgNS4xKyxcbiAqIE9wZXJhIDExLjYrLCBpT1MgNC4yKy5cbiAqXG4gKiBXZSByZXBvcnQgdGhhdCB0aGUgYnJvd3NlciBkb2VzIG5vdCBzdXBwb3J0IHR5cGVkIGFycmF5cyBpZiB0aGUgYXJlIG5vdCBzdWJjbGFzc2FibGVcbiAqIHVzaW5nIF9fcHJvdG9fXy4gRmlyZWZveCA0LTI5IGxhY2tzIHN1cHBvcnQgZm9yIGFkZGluZyBuZXcgcHJvcGVydGllcyB0byBgVWludDhBcnJheWBcbiAqIChTZWU6IGh0dHBzOi8vYnVnemlsbGEubW96aWxsYS5vcmcvc2hvd19idWcuY2dpP2lkPTY5NTQzOCkuIElFIDEwIGxhY2tzIHN1cHBvcnRcbiAqIGZvciBfX3Byb3RvX18gYW5kIGhhcyBhIGJ1Z2d5IHR5cGVkIGFycmF5IGltcGxlbWVudGF0aW9uLlxuICovXG5CdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCA9IHR5cGVkQXJyYXlTdXBwb3J0KClcblxuaWYgKCFCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCAmJiB0eXBlb2YgY29uc29sZSAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICB0eXBlb2YgY29uc29sZS5lcnJvciA9PT0gJ2Z1bmN0aW9uJykge1xuICBjb25zb2xlLmVycm9yKFxuICAgICdUaGlzIGJyb3dzZXIgbGFja3MgdHlwZWQgYXJyYXkgKFVpbnQ4QXJyYXkpIHN1cHBvcnQgd2hpY2ggaXMgcmVxdWlyZWQgYnkgJyArXG4gICAgJ2BidWZmZXJgIHY1LnguIFVzZSBgYnVmZmVyYCB2NC54IGlmIHlvdSByZXF1aXJlIG9sZCBicm93c2VyIHN1cHBvcnQuJ1xuICApXG59XG5cbmZ1bmN0aW9uIHR5cGVkQXJyYXlTdXBwb3J0ICgpIHtcbiAgLy8gQ2FuIHR5cGVkIGFycmF5IGluc3RhbmNlcyBjYW4gYmUgYXVnbWVudGVkP1xuICB0cnkge1xuICAgIHZhciBhcnIgPSBuZXcgVWludDhBcnJheSgxKVxuICAgIGFyci5fX3Byb3RvX18gPSB7X19wcm90b19fOiBVaW50OEFycmF5LnByb3RvdHlwZSwgZm9vOiBmdW5jdGlvbiAoKSB7IHJldHVybiA0MiB9fVxuICAgIHJldHVybiBhcnIuZm9vKCkgPT09IDQyXG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxufVxuXG5mdW5jdGlvbiBjcmVhdGVCdWZmZXIgKGxlbmd0aCkge1xuICBpZiAobGVuZ3RoID4gS19NQVhfTEVOR1RIKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0ludmFsaWQgdHlwZWQgYXJyYXkgbGVuZ3RoJylcbiAgfVxuICAvLyBSZXR1cm4gYW4gYXVnbWVudGVkIGBVaW50OEFycmF5YCBpbnN0YW5jZVxuICB2YXIgYnVmID0gbmV3IFVpbnQ4QXJyYXkobGVuZ3RoKVxuICBidWYuX19wcm90b19fID0gQnVmZmVyLnByb3RvdHlwZVxuICByZXR1cm4gYnVmXG59XG5cbi8qKlxuICogVGhlIEJ1ZmZlciBjb25zdHJ1Y3RvciByZXR1cm5zIGluc3RhbmNlcyBvZiBgVWludDhBcnJheWAgdGhhdCBoYXZlIHRoZWlyXG4gKiBwcm90b3R5cGUgY2hhbmdlZCB0byBgQnVmZmVyLnByb3RvdHlwZWAuIEZ1cnRoZXJtb3JlLCBgQnVmZmVyYCBpcyBhIHN1YmNsYXNzIG9mXG4gKiBgVWludDhBcnJheWAsIHNvIHRoZSByZXR1cm5lZCBpbnN0YW5jZXMgd2lsbCBoYXZlIGFsbCB0aGUgbm9kZSBgQnVmZmVyYCBtZXRob2RzXG4gKiBhbmQgdGhlIGBVaW50OEFycmF5YCBtZXRob2RzLiBTcXVhcmUgYnJhY2tldCBub3RhdGlvbiB3b3JrcyBhcyBleHBlY3RlZCAtLSBpdFxuICogcmV0dXJucyBhIHNpbmdsZSBvY3RldC5cbiAqXG4gKiBUaGUgYFVpbnQ4QXJyYXlgIHByb3RvdHlwZSByZW1haW5zIHVubW9kaWZpZWQuXG4gKi9cblxuZnVuY3Rpb24gQnVmZmVyIChhcmcsIGVuY29kaW5nT3JPZmZzZXQsIGxlbmd0aCkge1xuICAvLyBDb21tb24gY2FzZS5cbiAgaWYgKHR5cGVvZiBhcmcgPT09ICdudW1iZXInKSB7XG4gICAgaWYgKHR5cGVvZiBlbmNvZGluZ09yT2Zmc2V0ID09PSAnc3RyaW5nJykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAnSWYgZW5jb2RpbmcgaXMgc3BlY2lmaWVkIHRoZW4gdGhlIGZpcnN0IGFyZ3VtZW50IG11c3QgYmUgYSBzdHJpbmcnXG4gICAgICApXG4gICAgfVxuICAgIHJldHVybiBhbGxvY1Vuc2FmZShhcmcpXG4gIH1cbiAgcmV0dXJuIGZyb20oYXJnLCBlbmNvZGluZ09yT2Zmc2V0LCBsZW5ndGgpXG59XG5cbi8vIEZpeCBzdWJhcnJheSgpIGluIEVTMjAxNi4gU2VlOiBodHRwczovL2dpdGh1Yi5jb20vZmVyb3NzL2J1ZmZlci9wdWxsLzk3XG5pZiAodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnNwZWNpZXMgJiZcbiAgICBCdWZmZXJbU3ltYm9sLnNwZWNpZXNdID09PSBCdWZmZXIpIHtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEJ1ZmZlciwgU3ltYm9sLnNwZWNpZXMsIHtcbiAgICB2YWx1ZTogbnVsbCxcbiAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgd3JpdGFibGU6IGZhbHNlXG4gIH0pXG59XG5cbkJ1ZmZlci5wb29sU2l6ZSA9IDgxOTIgLy8gbm90IHVzZWQgYnkgdGhpcyBpbXBsZW1lbnRhdGlvblxuXG5mdW5jdGlvbiBmcm9tICh2YWx1ZSwgZW5jb2RpbmdPck9mZnNldCwgbGVuZ3RoKSB7XG4gIGlmICh0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignXCJ2YWx1ZVwiIGFyZ3VtZW50IG11c3Qgbm90IGJlIGEgbnVtYmVyJylcbiAgfVxuXG4gIGlmIChpc0FycmF5QnVmZmVyKHZhbHVlKSkge1xuICAgIHJldHVybiBmcm9tQXJyYXlCdWZmZXIodmFsdWUsIGVuY29kaW5nT3JPZmZzZXQsIGxlbmd0aClcbiAgfVxuXG4gIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIGZyb21TdHJpbmcodmFsdWUsIGVuY29kaW5nT3JPZmZzZXQpXG4gIH1cblxuICByZXR1cm4gZnJvbU9iamVjdCh2YWx1ZSlcbn1cblxuLyoqXG4gKiBGdW5jdGlvbmFsbHkgZXF1aXZhbGVudCB0byBCdWZmZXIoYXJnLCBlbmNvZGluZykgYnV0IHRocm93cyBhIFR5cGVFcnJvclxuICogaWYgdmFsdWUgaXMgYSBudW1iZXIuXG4gKiBCdWZmZXIuZnJvbShzdHJbLCBlbmNvZGluZ10pXG4gKiBCdWZmZXIuZnJvbShhcnJheSlcbiAqIEJ1ZmZlci5mcm9tKGJ1ZmZlcilcbiAqIEJ1ZmZlci5mcm9tKGFycmF5QnVmZmVyWywgYnl0ZU9mZnNldFssIGxlbmd0aF1dKVxuICoqL1xuQnVmZmVyLmZyb20gPSBmdW5jdGlvbiAodmFsdWUsIGVuY29kaW5nT3JPZmZzZXQsIGxlbmd0aCkge1xuICByZXR1cm4gZnJvbSh2YWx1ZSwgZW5jb2RpbmdPck9mZnNldCwgbGVuZ3RoKVxufVxuXG4vLyBOb3RlOiBDaGFuZ2UgcHJvdG90eXBlICphZnRlciogQnVmZmVyLmZyb20gaXMgZGVmaW5lZCB0byB3b3JrYXJvdW5kIENocm9tZSBidWc6XG4vLyBodHRwczovL2dpdGh1Yi5jb20vZmVyb3NzL2J1ZmZlci9wdWxsLzE0OFxuQnVmZmVyLnByb3RvdHlwZS5fX3Byb3RvX18gPSBVaW50OEFycmF5LnByb3RvdHlwZVxuQnVmZmVyLl9fcHJvdG9fXyA9IFVpbnQ4QXJyYXlcblxuZnVuY3Rpb24gYXNzZXJ0U2l6ZSAoc2l6ZSkge1xuICBpZiAodHlwZW9mIHNpemUgIT09ICdudW1iZXInKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignXCJzaXplXCIgYXJndW1lbnQgbXVzdCBiZSBhIG51bWJlcicpXG4gIH0gZWxzZSBpZiAoc2l6ZSA8IDApIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignXCJzaXplXCIgYXJndW1lbnQgbXVzdCBub3QgYmUgbmVnYXRpdmUnKVxuICB9XG59XG5cbmZ1bmN0aW9uIGFsbG9jIChzaXplLCBmaWxsLCBlbmNvZGluZykge1xuICBhc3NlcnRTaXplKHNpemUpXG4gIGlmIChzaXplIDw9IDApIHtcbiAgICByZXR1cm4gY3JlYXRlQnVmZmVyKHNpemUpXG4gIH1cbiAgaWYgKGZpbGwgIT09IHVuZGVmaW5lZCkge1xuICAgIC8vIE9ubHkgcGF5IGF0dGVudGlvbiB0byBlbmNvZGluZyBpZiBpdCdzIGEgc3RyaW5nLiBUaGlzXG4gICAgLy8gcHJldmVudHMgYWNjaWRlbnRhbGx5IHNlbmRpbmcgaW4gYSBudW1iZXIgdGhhdCB3b3VsZFxuICAgIC8vIGJlIGludGVycHJldHRlZCBhcyBhIHN0YXJ0IG9mZnNldC5cbiAgICByZXR1cm4gdHlwZW9mIGVuY29kaW5nID09PSAnc3RyaW5nJ1xuICAgICAgPyBjcmVhdGVCdWZmZXIoc2l6ZSkuZmlsbChmaWxsLCBlbmNvZGluZylcbiAgICAgIDogY3JlYXRlQnVmZmVyKHNpemUpLmZpbGwoZmlsbClcbiAgfVxuICByZXR1cm4gY3JlYXRlQnVmZmVyKHNpemUpXG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyBmaWxsZWQgQnVmZmVyIGluc3RhbmNlLlxuICogYWxsb2Moc2l6ZVssIGZpbGxbLCBlbmNvZGluZ11dKVxuICoqL1xuQnVmZmVyLmFsbG9jID0gZnVuY3Rpb24gKHNpemUsIGZpbGwsIGVuY29kaW5nKSB7XG4gIHJldHVybiBhbGxvYyhzaXplLCBmaWxsLCBlbmNvZGluZylcbn1cblxuZnVuY3Rpb24gYWxsb2NVbnNhZmUgKHNpemUpIHtcbiAgYXNzZXJ0U2l6ZShzaXplKVxuICByZXR1cm4gY3JlYXRlQnVmZmVyKHNpemUgPCAwID8gMCA6IGNoZWNrZWQoc2l6ZSkgfCAwKVxufVxuXG4vKipcbiAqIEVxdWl2YWxlbnQgdG8gQnVmZmVyKG51bSksIGJ5IGRlZmF1bHQgY3JlYXRlcyBhIG5vbi16ZXJvLWZpbGxlZCBCdWZmZXIgaW5zdGFuY2UuXG4gKiAqL1xuQnVmZmVyLmFsbG9jVW5zYWZlID0gZnVuY3Rpb24gKHNpemUpIHtcbiAgcmV0dXJuIGFsbG9jVW5zYWZlKHNpemUpXG59XG4vKipcbiAqIEVxdWl2YWxlbnQgdG8gU2xvd0J1ZmZlcihudW0pLCBieSBkZWZhdWx0IGNyZWF0ZXMgYSBub24temVyby1maWxsZWQgQnVmZmVyIGluc3RhbmNlLlxuICovXG5CdWZmZXIuYWxsb2NVbnNhZmVTbG93ID0gZnVuY3Rpb24gKHNpemUpIHtcbiAgcmV0dXJuIGFsbG9jVW5zYWZlKHNpemUpXG59XG5cbmZ1bmN0aW9uIGZyb21TdHJpbmcgKHN0cmluZywgZW5jb2RpbmcpIHtcbiAgaWYgKHR5cGVvZiBlbmNvZGluZyAhPT0gJ3N0cmluZycgfHwgZW5jb2RpbmcgPT09ICcnKSB7XG4gICAgZW5jb2RpbmcgPSAndXRmOCdcbiAgfVxuXG4gIGlmICghQnVmZmVyLmlzRW5jb2RpbmcoZW5jb2RpbmcpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignXCJlbmNvZGluZ1wiIG11c3QgYmUgYSB2YWxpZCBzdHJpbmcgZW5jb2RpbmcnKVxuICB9XG5cbiAgdmFyIGxlbmd0aCA9IGJ5dGVMZW5ndGgoc3RyaW5nLCBlbmNvZGluZykgfCAwXG4gIHZhciBidWYgPSBjcmVhdGVCdWZmZXIobGVuZ3RoKVxuXG4gIHZhciBhY3R1YWwgPSBidWYud3JpdGUoc3RyaW5nLCBlbmNvZGluZylcblxuICBpZiAoYWN0dWFsICE9PSBsZW5ndGgpIHtcbiAgICAvLyBXcml0aW5nIGEgaGV4IHN0cmluZywgZm9yIGV4YW1wbGUsIHRoYXQgY29udGFpbnMgaW52YWxpZCBjaGFyYWN0ZXJzIHdpbGxcbiAgICAvLyBjYXVzZSBldmVyeXRoaW5nIGFmdGVyIHRoZSBmaXJzdCBpbnZhbGlkIGNoYXJhY3RlciB0byBiZSBpZ25vcmVkLiAoZS5nLlxuICAgIC8vICdhYnh4Y2QnIHdpbGwgYmUgdHJlYXRlZCBhcyAnYWInKVxuICAgIGJ1ZiA9IGJ1Zi5zbGljZSgwLCBhY3R1YWwpXG4gIH1cblxuICByZXR1cm4gYnVmXG59XG5cbmZ1bmN0aW9uIGZyb21BcnJheUxpa2UgKGFycmF5KSB7XG4gIHZhciBsZW5ndGggPSBhcnJheS5sZW5ndGggPCAwID8gMCA6IGNoZWNrZWQoYXJyYXkubGVuZ3RoKSB8IDBcbiAgdmFyIGJ1ZiA9IGNyZWF0ZUJ1ZmZlcihsZW5ndGgpXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpICs9IDEpIHtcbiAgICBidWZbaV0gPSBhcnJheVtpXSAmIDI1NVxuICB9XG4gIHJldHVybiBidWZcbn1cblxuZnVuY3Rpb24gZnJvbUFycmF5QnVmZmVyIChhcnJheSwgYnl0ZU9mZnNldCwgbGVuZ3RoKSB7XG4gIGlmIChieXRlT2Zmc2V0IDwgMCB8fCBhcnJheS5ieXRlTGVuZ3RoIDwgYnl0ZU9mZnNldCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdcXCdvZmZzZXRcXCcgaXMgb3V0IG9mIGJvdW5kcycpXG4gIH1cblxuICBpZiAoYXJyYXkuYnl0ZUxlbmd0aCA8IGJ5dGVPZmZzZXQgKyAobGVuZ3RoIHx8IDApKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ1xcJ2xlbmd0aFxcJyBpcyBvdXQgb2YgYm91bmRzJylcbiAgfVxuXG4gIHZhciBidWZcbiAgaWYgKGJ5dGVPZmZzZXQgPT09IHVuZGVmaW5lZCAmJiBsZW5ndGggPT09IHVuZGVmaW5lZCkge1xuICAgIGJ1ZiA9IG5ldyBVaW50OEFycmF5KGFycmF5KVxuICB9IGVsc2UgaWYgKGxlbmd0aCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgYnVmID0gbmV3IFVpbnQ4QXJyYXkoYXJyYXksIGJ5dGVPZmZzZXQpXG4gIH0gZWxzZSB7XG4gICAgYnVmID0gbmV3IFVpbnQ4QXJyYXkoYXJyYXksIGJ5dGVPZmZzZXQsIGxlbmd0aClcbiAgfVxuXG4gIC8vIFJldHVybiBhbiBhdWdtZW50ZWQgYFVpbnQ4QXJyYXlgIGluc3RhbmNlXG4gIGJ1Zi5fX3Byb3RvX18gPSBCdWZmZXIucHJvdG90eXBlXG4gIHJldHVybiBidWZcbn1cblxuZnVuY3Rpb24gZnJvbU9iamVjdCAob2JqKSB7XG4gIGlmIChCdWZmZXIuaXNCdWZmZXIob2JqKSkge1xuICAgIHZhciBsZW4gPSBjaGVja2VkKG9iai5sZW5ndGgpIHwgMFxuICAgIHZhciBidWYgPSBjcmVhdGVCdWZmZXIobGVuKVxuXG4gICAgaWYgKGJ1Zi5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiBidWZcbiAgICB9XG5cbiAgICBvYmouY29weShidWYsIDAsIDAsIGxlbilcbiAgICByZXR1cm4gYnVmXG4gIH1cblxuICBpZiAob2JqKSB7XG4gICAgaWYgKGlzQXJyYXlCdWZmZXJWaWV3KG9iaikgfHwgJ2xlbmd0aCcgaW4gb2JqKSB7XG4gICAgICBpZiAodHlwZW9mIG9iai5sZW5ndGggIT09ICdudW1iZXInIHx8IG51bWJlcklzTmFOKG9iai5sZW5ndGgpKSB7XG4gICAgICAgIHJldHVybiBjcmVhdGVCdWZmZXIoMClcbiAgICAgIH1cbiAgICAgIHJldHVybiBmcm9tQXJyYXlMaWtlKG9iailcbiAgICB9XG5cbiAgICBpZiAob2JqLnR5cGUgPT09ICdCdWZmZXInICYmIEFycmF5LmlzQXJyYXkob2JqLmRhdGEpKSB7XG4gICAgICByZXR1cm4gZnJvbUFycmF5TGlrZShvYmouZGF0YSlcbiAgICB9XG4gIH1cblxuICB0aHJvdyBuZXcgVHlwZUVycm9yKCdGaXJzdCBhcmd1bWVudCBtdXN0IGJlIGEgc3RyaW5nLCBCdWZmZXIsIEFycmF5QnVmZmVyLCBBcnJheSwgb3IgYXJyYXktbGlrZSBvYmplY3QuJylcbn1cblxuZnVuY3Rpb24gY2hlY2tlZCAobGVuZ3RoKSB7XG4gIC8vIE5vdGU6IGNhbm5vdCB1c2UgYGxlbmd0aCA8IEtfTUFYX0xFTkdUSGAgaGVyZSBiZWNhdXNlIHRoYXQgZmFpbHMgd2hlblxuICAvLyBsZW5ndGggaXMgTmFOICh3aGljaCBpcyBvdGhlcndpc2UgY29lcmNlZCB0byB6ZXJvLilcbiAgaWYgKGxlbmd0aCA+PSBLX01BWF9MRU5HVEgpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignQXR0ZW1wdCB0byBhbGxvY2F0ZSBCdWZmZXIgbGFyZ2VyIHRoYW4gbWF4aW11bSAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAnc2l6ZTogMHgnICsgS19NQVhfTEVOR1RILnRvU3RyaW5nKDE2KSArICcgYnl0ZXMnKVxuICB9XG4gIHJldHVybiBsZW5ndGggfCAwXG59XG5cbmZ1bmN0aW9uIFNsb3dCdWZmZXIgKGxlbmd0aCkge1xuICBpZiAoK2xlbmd0aCAhPSBsZW5ndGgpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBlcWVxZXFcbiAgICBsZW5ndGggPSAwXG4gIH1cbiAgcmV0dXJuIEJ1ZmZlci5hbGxvYygrbGVuZ3RoKVxufVxuXG5CdWZmZXIuaXNCdWZmZXIgPSBmdW5jdGlvbiBpc0J1ZmZlciAoYikge1xuICByZXR1cm4gYiAhPSBudWxsICYmIGIuX2lzQnVmZmVyID09PSB0cnVlXG59XG5cbkJ1ZmZlci5jb21wYXJlID0gZnVuY3Rpb24gY29tcGFyZSAoYSwgYikge1xuICBpZiAoIUJ1ZmZlci5pc0J1ZmZlcihhKSB8fCAhQnVmZmVyLmlzQnVmZmVyKGIpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQXJndW1lbnRzIG11c3QgYmUgQnVmZmVycycpXG4gIH1cblxuICBpZiAoYSA9PT0gYikgcmV0dXJuIDBcblxuICB2YXIgeCA9IGEubGVuZ3RoXG4gIHZhciB5ID0gYi5sZW5ndGhcblxuICBmb3IgKHZhciBpID0gMCwgbGVuID0gTWF0aC5taW4oeCwgeSk7IGkgPCBsZW47ICsraSkge1xuICAgIGlmIChhW2ldICE9PSBiW2ldKSB7XG4gICAgICB4ID0gYVtpXVxuICAgICAgeSA9IGJbaV1cbiAgICAgIGJyZWFrXG4gICAgfVxuICB9XG5cbiAgaWYgKHggPCB5KSByZXR1cm4gLTFcbiAgaWYgKHkgPCB4KSByZXR1cm4gMVxuICByZXR1cm4gMFxufVxuXG5CdWZmZXIuaXNFbmNvZGluZyA9IGZ1bmN0aW9uIGlzRW5jb2RpbmcgKGVuY29kaW5nKSB7XG4gIHN3aXRjaCAoU3RyaW5nKGVuY29kaW5nKS50b0xvd2VyQ2FzZSgpKSB7XG4gICAgY2FzZSAnaGV4JzpcbiAgICBjYXNlICd1dGY4JzpcbiAgICBjYXNlICd1dGYtOCc6XG4gICAgY2FzZSAnYXNjaWknOlxuICAgIGNhc2UgJ2xhdGluMSc6XG4gICAgY2FzZSAnYmluYXJ5JzpcbiAgICBjYXNlICdiYXNlNjQnOlxuICAgIGNhc2UgJ3VjczInOlxuICAgIGNhc2UgJ3Vjcy0yJzpcbiAgICBjYXNlICd1dGYxNmxlJzpcbiAgICBjYXNlICd1dGYtMTZsZSc6XG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gZmFsc2VcbiAgfVxufVxuXG5CdWZmZXIuY29uY2F0ID0gZnVuY3Rpb24gY29uY2F0IChsaXN0LCBsZW5ndGgpIHtcbiAgaWYgKCFBcnJheS5pc0FycmF5KGxpc3QpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignXCJsaXN0XCIgYXJndW1lbnQgbXVzdCBiZSBhbiBBcnJheSBvZiBCdWZmZXJzJylcbiAgfVxuXG4gIGlmIChsaXN0Lmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiBCdWZmZXIuYWxsb2MoMClcbiAgfVxuXG4gIHZhciBpXG4gIGlmIChsZW5ndGggPT09IHVuZGVmaW5lZCkge1xuICAgIGxlbmd0aCA9IDBcbiAgICBmb3IgKGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7ICsraSkge1xuICAgICAgbGVuZ3RoICs9IGxpc3RbaV0ubGVuZ3RoXG4gICAgfVxuICB9XG5cbiAgdmFyIGJ1ZmZlciA9IEJ1ZmZlci5hbGxvY1Vuc2FmZShsZW5ndGgpXG4gIHZhciBwb3MgPSAwXG4gIGZvciAoaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgKytpKSB7XG4gICAgdmFyIGJ1ZiA9IGxpc3RbaV1cbiAgICBpZiAoIUJ1ZmZlci5pc0J1ZmZlcihidWYpKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdcImxpc3RcIiBhcmd1bWVudCBtdXN0IGJlIGFuIEFycmF5IG9mIEJ1ZmZlcnMnKVxuICAgIH1cbiAgICBidWYuY29weShidWZmZXIsIHBvcylcbiAgICBwb3MgKz0gYnVmLmxlbmd0aFxuICB9XG4gIHJldHVybiBidWZmZXJcbn1cblxuZnVuY3Rpb24gYnl0ZUxlbmd0aCAoc3RyaW5nLCBlbmNvZGluZykge1xuICBpZiAoQnVmZmVyLmlzQnVmZmVyKHN0cmluZykpIHtcbiAgICByZXR1cm4gc3RyaW5nLmxlbmd0aFxuICB9XG4gIGlmIChpc0FycmF5QnVmZmVyVmlldyhzdHJpbmcpIHx8IGlzQXJyYXlCdWZmZXIoc3RyaW5nKSkge1xuICAgIHJldHVybiBzdHJpbmcuYnl0ZUxlbmd0aFxuICB9XG4gIGlmICh0eXBlb2Ygc3RyaW5nICE9PSAnc3RyaW5nJykge1xuICAgIHN0cmluZyA9ICcnICsgc3RyaW5nXG4gIH1cblxuICB2YXIgbGVuID0gc3RyaW5nLmxlbmd0aFxuICBpZiAobGVuID09PSAwKSByZXR1cm4gMFxuXG4gIC8vIFVzZSBhIGZvciBsb29wIHRvIGF2b2lkIHJlY3Vyc2lvblxuICB2YXIgbG93ZXJlZENhc2UgPSBmYWxzZVxuICBmb3IgKDs7KSB7XG4gICAgc3dpdGNoIChlbmNvZGluZykge1xuICAgICAgY2FzZSAnYXNjaWknOlxuICAgICAgY2FzZSAnbGF0aW4xJzpcbiAgICAgIGNhc2UgJ2JpbmFyeSc6XG4gICAgICAgIHJldHVybiBsZW5cbiAgICAgIGNhc2UgJ3V0ZjgnOlxuICAgICAgY2FzZSAndXRmLTgnOlxuICAgICAgY2FzZSB1bmRlZmluZWQ6XG4gICAgICAgIHJldHVybiB1dGY4VG9CeXRlcyhzdHJpbmcpLmxlbmd0aFxuICAgICAgY2FzZSAndWNzMic6XG4gICAgICBjYXNlICd1Y3MtMic6XG4gICAgICBjYXNlICd1dGYxNmxlJzpcbiAgICAgIGNhc2UgJ3V0Zi0xNmxlJzpcbiAgICAgICAgcmV0dXJuIGxlbiAqIDJcbiAgICAgIGNhc2UgJ2hleCc6XG4gICAgICAgIHJldHVybiBsZW4gPj4+IDFcbiAgICAgIGNhc2UgJ2Jhc2U2NCc6XG4gICAgICAgIHJldHVybiBiYXNlNjRUb0J5dGVzKHN0cmluZykubGVuZ3RoXG4gICAgICBkZWZhdWx0OlxuICAgICAgICBpZiAobG93ZXJlZENhc2UpIHJldHVybiB1dGY4VG9CeXRlcyhzdHJpbmcpLmxlbmd0aCAvLyBhc3N1bWUgdXRmOFxuICAgICAgICBlbmNvZGluZyA9ICgnJyArIGVuY29kaW5nKS50b0xvd2VyQ2FzZSgpXG4gICAgICAgIGxvd2VyZWRDYXNlID0gdHJ1ZVxuICAgIH1cbiAgfVxufVxuQnVmZmVyLmJ5dGVMZW5ndGggPSBieXRlTGVuZ3RoXG5cbmZ1bmN0aW9uIHNsb3dUb1N0cmluZyAoZW5jb2RpbmcsIHN0YXJ0LCBlbmQpIHtcbiAgdmFyIGxvd2VyZWRDYXNlID0gZmFsc2VcblxuICAvLyBObyBuZWVkIHRvIHZlcmlmeSB0aGF0IFwidGhpcy5sZW5ndGggPD0gTUFYX1VJTlQzMlwiIHNpbmNlIGl0J3MgYSByZWFkLW9ubHlcbiAgLy8gcHJvcGVydHkgb2YgYSB0eXBlZCBhcnJheS5cblxuICAvLyBUaGlzIGJlaGF2ZXMgbmVpdGhlciBsaWtlIFN0cmluZyBub3IgVWludDhBcnJheSBpbiB0aGF0IHdlIHNldCBzdGFydC9lbmRcbiAgLy8gdG8gdGhlaXIgdXBwZXIvbG93ZXIgYm91bmRzIGlmIHRoZSB2YWx1ZSBwYXNzZWQgaXMgb3V0IG9mIHJhbmdlLlxuICAvLyB1bmRlZmluZWQgaXMgaGFuZGxlZCBzcGVjaWFsbHkgYXMgcGVyIEVDTUEtMjYyIDZ0aCBFZGl0aW9uLFxuICAvLyBTZWN0aW9uIDEzLjMuMy43IFJ1bnRpbWUgU2VtYW50aWNzOiBLZXllZEJpbmRpbmdJbml0aWFsaXphdGlvbi5cbiAgaWYgKHN0YXJ0ID09PSB1bmRlZmluZWQgfHwgc3RhcnQgPCAwKSB7XG4gICAgc3RhcnQgPSAwXG4gIH1cbiAgLy8gUmV0dXJuIGVhcmx5IGlmIHN0YXJ0ID4gdGhpcy5sZW5ndGguIERvbmUgaGVyZSB0byBwcmV2ZW50IHBvdGVudGlhbCB1aW50MzJcbiAgLy8gY29lcmNpb24gZmFpbCBiZWxvdy5cbiAgaWYgKHN0YXJ0ID4gdGhpcy5sZW5ndGgpIHtcbiAgICByZXR1cm4gJydcbiAgfVxuXG4gIGlmIChlbmQgPT09IHVuZGVmaW5lZCB8fCBlbmQgPiB0aGlzLmxlbmd0aCkge1xuICAgIGVuZCA9IHRoaXMubGVuZ3RoXG4gIH1cblxuICBpZiAoZW5kIDw9IDApIHtcbiAgICByZXR1cm4gJydcbiAgfVxuXG4gIC8vIEZvcmNlIGNvZXJzaW9uIHRvIHVpbnQzMi4gVGhpcyB3aWxsIGFsc28gY29lcmNlIGZhbHNleS9OYU4gdmFsdWVzIHRvIDAuXG4gIGVuZCA+Pj49IDBcbiAgc3RhcnQgPj4+PSAwXG5cbiAgaWYgKGVuZCA8PSBzdGFydCkge1xuICAgIHJldHVybiAnJ1xuICB9XG5cbiAgaWYgKCFlbmNvZGluZykgZW5jb2RpbmcgPSAndXRmOCdcblxuICB3aGlsZSAodHJ1ZSkge1xuICAgIHN3aXRjaCAoZW5jb2RpbmcpIHtcbiAgICAgIGNhc2UgJ2hleCc6XG4gICAgICAgIHJldHVybiBoZXhTbGljZSh0aGlzLCBzdGFydCwgZW5kKVxuXG4gICAgICBjYXNlICd1dGY4JzpcbiAgICAgIGNhc2UgJ3V0Zi04JzpcbiAgICAgICAgcmV0dXJuIHV0ZjhTbGljZSh0aGlzLCBzdGFydCwgZW5kKVxuXG4gICAgICBjYXNlICdhc2NpaSc6XG4gICAgICAgIHJldHVybiBhc2NpaVNsaWNlKHRoaXMsIHN0YXJ0LCBlbmQpXG5cbiAgICAgIGNhc2UgJ2xhdGluMSc6XG4gICAgICBjYXNlICdiaW5hcnknOlxuICAgICAgICByZXR1cm4gbGF0aW4xU2xpY2UodGhpcywgc3RhcnQsIGVuZClcblxuICAgICAgY2FzZSAnYmFzZTY0JzpcbiAgICAgICAgcmV0dXJuIGJhc2U2NFNsaWNlKHRoaXMsIHN0YXJ0LCBlbmQpXG5cbiAgICAgIGNhc2UgJ3VjczInOlxuICAgICAgY2FzZSAndWNzLTInOlxuICAgICAgY2FzZSAndXRmMTZsZSc6XG4gICAgICBjYXNlICd1dGYtMTZsZSc6XG4gICAgICAgIHJldHVybiB1dGYxNmxlU2xpY2UodGhpcywgc3RhcnQsIGVuZClcblxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgaWYgKGxvd2VyZWRDYXNlKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdVbmtub3duIGVuY29kaW5nOiAnICsgZW5jb2RpbmcpXG4gICAgICAgIGVuY29kaW5nID0gKGVuY29kaW5nICsgJycpLnRvTG93ZXJDYXNlKClcbiAgICAgICAgbG93ZXJlZENhc2UgPSB0cnVlXG4gICAgfVxuICB9XG59XG5cbi8vIFRoaXMgcHJvcGVydHkgaXMgdXNlZCBieSBgQnVmZmVyLmlzQnVmZmVyYCAoYW5kIHRoZSBgaXMtYnVmZmVyYCBucG0gcGFja2FnZSlcbi8vIHRvIGRldGVjdCBhIEJ1ZmZlciBpbnN0YW5jZS4gSXQncyBub3QgcG9zc2libGUgdG8gdXNlIGBpbnN0YW5jZW9mIEJ1ZmZlcmBcbi8vIHJlbGlhYmx5IGluIGEgYnJvd3NlcmlmeSBjb250ZXh0IGJlY2F1c2UgdGhlcmUgY291bGQgYmUgbXVsdGlwbGUgZGlmZmVyZW50XG4vLyBjb3BpZXMgb2YgdGhlICdidWZmZXInIHBhY2thZ2UgaW4gdXNlLiBUaGlzIG1ldGhvZCB3b3JrcyBldmVuIGZvciBCdWZmZXJcbi8vIGluc3RhbmNlcyB0aGF0IHdlcmUgY3JlYXRlZCBmcm9tIGFub3RoZXIgY29weSBvZiB0aGUgYGJ1ZmZlcmAgcGFja2FnZS5cbi8vIFNlZTogaHR0cHM6Ly9naXRodWIuY29tL2Zlcm9zcy9idWZmZXIvaXNzdWVzLzE1NFxuQnVmZmVyLnByb3RvdHlwZS5faXNCdWZmZXIgPSB0cnVlXG5cbmZ1bmN0aW9uIHN3YXAgKGIsIG4sIG0pIHtcbiAgdmFyIGkgPSBiW25dXG4gIGJbbl0gPSBiW21dXG4gIGJbbV0gPSBpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUuc3dhcDE2ID0gZnVuY3Rpb24gc3dhcDE2ICgpIHtcbiAgdmFyIGxlbiA9IHRoaXMubGVuZ3RoXG4gIGlmIChsZW4gJSAyICE9PSAwKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0J1ZmZlciBzaXplIG11c3QgYmUgYSBtdWx0aXBsZSBvZiAxNi1iaXRzJylcbiAgfVxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSArPSAyKSB7XG4gICAgc3dhcCh0aGlzLCBpLCBpICsgMSlcbiAgfVxuICByZXR1cm4gdGhpc1xufVxuXG5CdWZmZXIucHJvdG90eXBlLnN3YXAzMiA9IGZ1bmN0aW9uIHN3YXAzMiAoKSB7XG4gIHZhciBsZW4gPSB0aGlzLmxlbmd0aFxuICBpZiAobGVuICUgNCAhPT0gMCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdCdWZmZXIgc2l6ZSBtdXN0IGJlIGEgbXVsdGlwbGUgb2YgMzItYml0cycpXG4gIH1cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkgKz0gNCkge1xuICAgIHN3YXAodGhpcywgaSwgaSArIDMpXG4gICAgc3dhcCh0aGlzLCBpICsgMSwgaSArIDIpXG4gIH1cbiAgcmV0dXJuIHRoaXNcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5zd2FwNjQgPSBmdW5jdGlvbiBzd2FwNjQgKCkge1xuICB2YXIgbGVuID0gdGhpcy5sZW5ndGhcbiAgaWYgKGxlbiAlIDggIT09IDApIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignQnVmZmVyIHNpemUgbXVzdCBiZSBhIG11bHRpcGxlIG9mIDY0LWJpdHMnKVxuICB9XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpICs9IDgpIHtcbiAgICBzd2FwKHRoaXMsIGksIGkgKyA3KVxuICAgIHN3YXAodGhpcywgaSArIDEsIGkgKyA2KVxuICAgIHN3YXAodGhpcywgaSArIDIsIGkgKyA1KVxuICAgIHN3YXAodGhpcywgaSArIDMsIGkgKyA0KVxuICB9XG4gIHJldHVybiB0aGlzXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZyAoKSB7XG4gIHZhciBsZW5ndGggPSB0aGlzLmxlbmd0aFxuICBpZiAobGVuZ3RoID09PSAwKSByZXR1cm4gJydcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApIHJldHVybiB1dGY4U2xpY2UodGhpcywgMCwgbGVuZ3RoKVxuICByZXR1cm4gc2xvd1RvU3RyaW5nLmFwcGx5KHRoaXMsIGFyZ3VtZW50cylcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5lcXVhbHMgPSBmdW5jdGlvbiBlcXVhbHMgKGIpIHtcbiAgaWYgKCFCdWZmZXIuaXNCdWZmZXIoYikpIHRocm93IG5ldyBUeXBlRXJyb3IoJ0FyZ3VtZW50IG11c3QgYmUgYSBCdWZmZXInKVxuICBpZiAodGhpcyA9PT0gYikgcmV0dXJuIHRydWVcbiAgcmV0dXJuIEJ1ZmZlci5jb21wYXJlKHRoaXMsIGIpID09PSAwXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUuaW5zcGVjdCA9IGZ1bmN0aW9uIGluc3BlY3QgKCkge1xuICB2YXIgc3RyID0gJydcbiAgdmFyIG1heCA9IGV4cG9ydHMuSU5TUEVDVF9NQVhfQllURVNcbiAgaWYgKHRoaXMubGVuZ3RoID4gMCkge1xuICAgIHN0ciA9IHRoaXMudG9TdHJpbmcoJ2hleCcsIDAsIG1heCkubWF0Y2goLy57Mn0vZykuam9pbignICcpXG4gICAgaWYgKHRoaXMubGVuZ3RoID4gbWF4KSBzdHIgKz0gJyAuLi4gJ1xuICB9XG4gIHJldHVybiAnPEJ1ZmZlciAnICsgc3RyICsgJz4nXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUuY29tcGFyZSA9IGZ1bmN0aW9uIGNvbXBhcmUgKHRhcmdldCwgc3RhcnQsIGVuZCwgdGhpc1N0YXJ0LCB0aGlzRW5kKSB7XG4gIGlmICghQnVmZmVyLmlzQnVmZmVyKHRhcmdldCkpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdBcmd1bWVudCBtdXN0IGJlIGEgQnVmZmVyJylcbiAgfVxuXG4gIGlmIChzdGFydCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgc3RhcnQgPSAwXG4gIH1cbiAgaWYgKGVuZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgZW5kID0gdGFyZ2V0ID8gdGFyZ2V0Lmxlbmd0aCA6IDBcbiAgfVxuICBpZiAodGhpc1N0YXJ0ID09PSB1bmRlZmluZWQpIHtcbiAgICB0aGlzU3RhcnQgPSAwXG4gIH1cbiAgaWYgKHRoaXNFbmQgPT09IHVuZGVmaW5lZCkge1xuICAgIHRoaXNFbmQgPSB0aGlzLmxlbmd0aFxuICB9XG5cbiAgaWYgKHN0YXJ0IDwgMCB8fCBlbmQgPiB0YXJnZXQubGVuZ3RoIHx8IHRoaXNTdGFydCA8IDAgfHwgdGhpc0VuZCA+IHRoaXMubGVuZ3RoKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ291dCBvZiByYW5nZSBpbmRleCcpXG4gIH1cblxuICBpZiAodGhpc1N0YXJ0ID49IHRoaXNFbmQgJiYgc3RhcnQgPj0gZW5kKSB7XG4gICAgcmV0dXJuIDBcbiAgfVxuICBpZiAodGhpc1N0YXJ0ID49IHRoaXNFbmQpIHtcbiAgICByZXR1cm4gLTFcbiAgfVxuICBpZiAoc3RhcnQgPj0gZW5kKSB7XG4gICAgcmV0dXJuIDFcbiAgfVxuXG4gIHN0YXJ0ID4+Pj0gMFxuICBlbmQgPj4+PSAwXG4gIHRoaXNTdGFydCA+Pj49IDBcbiAgdGhpc0VuZCA+Pj49IDBcblxuICBpZiAodGhpcyA9PT0gdGFyZ2V0KSByZXR1cm4gMFxuXG4gIHZhciB4ID0gdGhpc0VuZCAtIHRoaXNTdGFydFxuICB2YXIgeSA9IGVuZCAtIHN0YXJ0XG4gIHZhciBsZW4gPSBNYXRoLm1pbih4LCB5KVxuXG4gIHZhciB0aGlzQ29weSA9IHRoaXMuc2xpY2UodGhpc1N0YXJ0LCB0aGlzRW5kKVxuICB2YXIgdGFyZ2V0Q29weSA9IHRhcmdldC5zbGljZShzdGFydCwgZW5kKVxuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyArK2kpIHtcbiAgICBpZiAodGhpc0NvcHlbaV0gIT09IHRhcmdldENvcHlbaV0pIHtcbiAgICAgIHggPSB0aGlzQ29weVtpXVxuICAgICAgeSA9IHRhcmdldENvcHlbaV1cbiAgICAgIGJyZWFrXG4gICAgfVxuICB9XG5cbiAgaWYgKHggPCB5KSByZXR1cm4gLTFcbiAgaWYgKHkgPCB4KSByZXR1cm4gMVxuICByZXR1cm4gMFxufVxuXG4vLyBGaW5kcyBlaXRoZXIgdGhlIGZpcnN0IGluZGV4IG9mIGB2YWxgIGluIGBidWZmZXJgIGF0IG9mZnNldCA+PSBgYnl0ZU9mZnNldGAsXG4vLyBPUiB0aGUgbGFzdCBpbmRleCBvZiBgdmFsYCBpbiBgYnVmZmVyYCBhdCBvZmZzZXQgPD0gYGJ5dGVPZmZzZXRgLlxuLy9cbi8vIEFyZ3VtZW50czpcbi8vIC0gYnVmZmVyIC0gYSBCdWZmZXIgdG8gc2VhcmNoXG4vLyAtIHZhbCAtIGEgc3RyaW5nLCBCdWZmZXIsIG9yIG51bWJlclxuLy8gLSBieXRlT2Zmc2V0IC0gYW4gaW5kZXggaW50byBgYnVmZmVyYDsgd2lsbCBiZSBjbGFtcGVkIHRvIGFuIGludDMyXG4vLyAtIGVuY29kaW5nIC0gYW4gb3B0aW9uYWwgZW5jb2RpbmcsIHJlbGV2YW50IGlzIHZhbCBpcyBhIHN0cmluZ1xuLy8gLSBkaXIgLSB0cnVlIGZvciBpbmRleE9mLCBmYWxzZSBmb3IgbGFzdEluZGV4T2ZcbmZ1bmN0aW9uIGJpZGlyZWN0aW9uYWxJbmRleE9mIChidWZmZXIsIHZhbCwgYnl0ZU9mZnNldCwgZW5jb2RpbmcsIGRpcikge1xuICAvLyBFbXB0eSBidWZmZXIgbWVhbnMgbm8gbWF0Y2hcbiAgaWYgKGJ1ZmZlci5sZW5ndGggPT09IDApIHJldHVybiAtMVxuXG4gIC8vIE5vcm1hbGl6ZSBieXRlT2Zmc2V0XG4gIGlmICh0eXBlb2YgYnl0ZU9mZnNldCA9PT0gJ3N0cmluZycpIHtcbiAgICBlbmNvZGluZyA9IGJ5dGVPZmZzZXRcbiAgICBieXRlT2Zmc2V0ID0gMFxuICB9IGVsc2UgaWYgKGJ5dGVPZmZzZXQgPiAweDdmZmZmZmZmKSB7XG4gICAgYnl0ZU9mZnNldCA9IDB4N2ZmZmZmZmZcbiAgfSBlbHNlIGlmIChieXRlT2Zmc2V0IDwgLTB4ODAwMDAwMDApIHtcbiAgICBieXRlT2Zmc2V0ID0gLTB4ODAwMDAwMDBcbiAgfVxuICBieXRlT2Zmc2V0ID0gK2J5dGVPZmZzZXQgIC8vIENvZXJjZSB0byBOdW1iZXIuXG4gIGlmIChudW1iZXJJc05hTihieXRlT2Zmc2V0KSkge1xuICAgIC8vIGJ5dGVPZmZzZXQ6IGl0IGl0J3MgdW5kZWZpbmVkLCBudWxsLCBOYU4sIFwiZm9vXCIsIGV0Yywgc2VhcmNoIHdob2xlIGJ1ZmZlclxuICAgIGJ5dGVPZmZzZXQgPSBkaXIgPyAwIDogKGJ1ZmZlci5sZW5ndGggLSAxKVxuICB9XG5cbiAgLy8gTm9ybWFsaXplIGJ5dGVPZmZzZXQ6IG5lZ2F0aXZlIG9mZnNldHMgc3RhcnQgZnJvbSB0aGUgZW5kIG9mIHRoZSBidWZmZXJcbiAgaWYgKGJ5dGVPZmZzZXQgPCAwKSBieXRlT2Zmc2V0ID0gYnVmZmVyLmxlbmd0aCArIGJ5dGVPZmZzZXRcbiAgaWYgKGJ5dGVPZmZzZXQgPj0gYnVmZmVyLmxlbmd0aCkge1xuICAgIGlmIChkaXIpIHJldHVybiAtMVxuICAgIGVsc2UgYnl0ZU9mZnNldCA9IGJ1ZmZlci5sZW5ndGggLSAxXG4gIH0gZWxzZSBpZiAoYnl0ZU9mZnNldCA8IDApIHtcbiAgICBpZiAoZGlyKSBieXRlT2Zmc2V0ID0gMFxuICAgIGVsc2UgcmV0dXJuIC0xXG4gIH1cblxuICAvLyBOb3JtYWxpemUgdmFsXG4gIGlmICh0eXBlb2YgdmFsID09PSAnc3RyaW5nJykge1xuICAgIHZhbCA9IEJ1ZmZlci5mcm9tKHZhbCwgZW5jb2RpbmcpXG4gIH1cblxuICAvLyBGaW5hbGx5LCBzZWFyY2ggZWl0aGVyIGluZGV4T2YgKGlmIGRpciBpcyB0cnVlKSBvciBsYXN0SW5kZXhPZlxuICBpZiAoQnVmZmVyLmlzQnVmZmVyKHZhbCkpIHtcbiAgICAvLyBTcGVjaWFsIGNhc2U6IGxvb2tpbmcgZm9yIGVtcHR5IHN0cmluZy9idWZmZXIgYWx3YXlzIGZhaWxzXG4gICAgaWYgKHZhbC5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiAtMVxuICAgIH1cbiAgICByZXR1cm4gYXJyYXlJbmRleE9mKGJ1ZmZlciwgdmFsLCBieXRlT2Zmc2V0LCBlbmNvZGluZywgZGlyKVxuICB9IGVsc2UgaWYgKHR5cGVvZiB2YWwgPT09ICdudW1iZXInKSB7XG4gICAgdmFsID0gdmFsICYgMHhGRiAvLyBTZWFyY2ggZm9yIGEgYnl0ZSB2YWx1ZSBbMC0yNTVdXG4gICAgaWYgKHR5cGVvZiBVaW50OEFycmF5LnByb3RvdHlwZS5pbmRleE9mID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBpZiAoZGlyKSB7XG4gICAgICAgIHJldHVybiBVaW50OEFycmF5LnByb3RvdHlwZS5pbmRleE9mLmNhbGwoYnVmZmVyLCB2YWwsIGJ5dGVPZmZzZXQpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gVWludDhBcnJheS5wcm90b3R5cGUubGFzdEluZGV4T2YuY2FsbChidWZmZXIsIHZhbCwgYnl0ZU9mZnNldClcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGFycmF5SW5kZXhPZihidWZmZXIsIFsgdmFsIF0sIGJ5dGVPZmZzZXQsIGVuY29kaW5nLCBkaXIpXG4gIH1cblxuICB0aHJvdyBuZXcgVHlwZUVycm9yKCd2YWwgbXVzdCBiZSBzdHJpbmcsIG51bWJlciBvciBCdWZmZXInKVxufVxuXG5mdW5jdGlvbiBhcnJheUluZGV4T2YgKGFyciwgdmFsLCBieXRlT2Zmc2V0LCBlbmNvZGluZywgZGlyKSB7XG4gIHZhciBpbmRleFNpemUgPSAxXG4gIHZhciBhcnJMZW5ndGggPSBhcnIubGVuZ3RoXG4gIHZhciB2YWxMZW5ndGggPSB2YWwubGVuZ3RoXG5cbiAgaWYgKGVuY29kaW5nICE9PSB1bmRlZmluZWQpIHtcbiAgICBlbmNvZGluZyA9IFN0cmluZyhlbmNvZGluZykudG9Mb3dlckNhc2UoKVxuICAgIGlmIChlbmNvZGluZyA9PT0gJ3VjczInIHx8IGVuY29kaW5nID09PSAndWNzLTInIHx8XG4gICAgICAgIGVuY29kaW5nID09PSAndXRmMTZsZScgfHwgZW5jb2RpbmcgPT09ICd1dGYtMTZsZScpIHtcbiAgICAgIGlmIChhcnIubGVuZ3RoIDwgMiB8fCB2YWwubGVuZ3RoIDwgMikge1xuICAgICAgICByZXR1cm4gLTFcbiAgICAgIH1cbiAgICAgIGluZGV4U2l6ZSA9IDJcbiAgICAgIGFyckxlbmd0aCAvPSAyXG4gICAgICB2YWxMZW5ndGggLz0gMlxuICAgICAgYnl0ZU9mZnNldCAvPSAyXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcmVhZCAoYnVmLCBpKSB7XG4gICAgaWYgKGluZGV4U2l6ZSA9PT0gMSkge1xuICAgICAgcmV0dXJuIGJ1ZltpXVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gYnVmLnJlYWRVSW50MTZCRShpICogaW5kZXhTaXplKVxuICAgIH1cbiAgfVxuXG4gIHZhciBpXG4gIGlmIChkaXIpIHtcbiAgICB2YXIgZm91bmRJbmRleCA9IC0xXG4gICAgZm9yIChpID0gYnl0ZU9mZnNldDsgaSA8IGFyckxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAocmVhZChhcnIsIGkpID09PSByZWFkKHZhbCwgZm91bmRJbmRleCA9PT0gLTEgPyAwIDogaSAtIGZvdW5kSW5kZXgpKSB7XG4gICAgICAgIGlmIChmb3VuZEluZGV4ID09PSAtMSkgZm91bmRJbmRleCA9IGlcbiAgICAgICAgaWYgKGkgLSBmb3VuZEluZGV4ICsgMSA9PT0gdmFsTGVuZ3RoKSByZXR1cm4gZm91bmRJbmRleCAqIGluZGV4U2l6ZVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKGZvdW5kSW5kZXggIT09IC0xKSBpIC09IGkgLSBmb3VuZEluZGV4XG4gICAgICAgIGZvdW5kSW5kZXggPSAtMVxuICAgICAgfVxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBpZiAoYnl0ZU9mZnNldCArIHZhbExlbmd0aCA+IGFyckxlbmd0aCkgYnl0ZU9mZnNldCA9IGFyckxlbmd0aCAtIHZhbExlbmd0aFxuICAgIGZvciAoaSA9IGJ5dGVPZmZzZXQ7IGkgPj0gMDsgaS0tKSB7XG4gICAgICB2YXIgZm91bmQgPSB0cnVlXG4gICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHZhbExlbmd0aDsgaisrKSB7XG4gICAgICAgIGlmIChyZWFkKGFyciwgaSArIGopICE9PSByZWFkKHZhbCwgaikpIHtcbiAgICAgICAgICBmb3VuZCA9IGZhbHNlXG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKGZvdW5kKSByZXR1cm4gaVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiAtMVxufVxuXG5CdWZmZXIucHJvdG90eXBlLmluY2x1ZGVzID0gZnVuY3Rpb24gaW5jbHVkZXMgKHZhbCwgYnl0ZU9mZnNldCwgZW5jb2RpbmcpIHtcbiAgcmV0dXJuIHRoaXMuaW5kZXhPZih2YWwsIGJ5dGVPZmZzZXQsIGVuY29kaW5nKSAhPT0gLTFcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5pbmRleE9mID0gZnVuY3Rpb24gaW5kZXhPZiAodmFsLCBieXRlT2Zmc2V0LCBlbmNvZGluZykge1xuICByZXR1cm4gYmlkaXJlY3Rpb25hbEluZGV4T2YodGhpcywgdmFsLCBieXRlT2Zmc2V0LCBlbmNvZGluZywgdHJ1ZSlcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5sYXN0SW5kZXhPZiA9IGZ1bmN0aW9uIGxhc3RJbmRleE9mICh2YWwsIGJ5dGVPZmZzZXQsIGVuY29kaW5nKSB7XG4gIHJldHVybiBiaWRpcmVjdGlvbmFsSW5kZXhPZih0aGlzLCB2YWwsIGJ5dGVPZmZzZXQsIGVuY29kaW5nLCBmYWxzZSlcbn1cblxuZnVuY3Rpb24gaGV4V3JpdGUgKGJ1Ziwgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCkge1xuICBvZmZzZXQgPSBOdW1iZXIob2Zmc2V0KSB8fCAwXG4gIHZhciByZW1haW5pbmcgPSBidWYubGVuZ3RoIC0gb2Zmc2V0XG4gIGlmICghbGVuZ3RoKSB7XG4gICAgbGVuZ3RoID0gcmVtYWluaW5nXG4gIH0gZWxzZSB7XG4gICAgbGVuZ3RoID0gTnVtYmVyKGxlbmd0aClcbiAgICBpZiAobGVuZ3RoID4gcmVtYWluaW5nKSB7XG4gICAgICBsZW5ndGggPSByZW1haW5pbmdcbiAgICB9XG4gIH1cblxuICAvLyBtdXN0IGJlIGFuIGV2ZW4gbnVtYmVyIG9mIGRpZ2l0c1xuICB2YXIgc3RyTGVuID0gc3RyaW5nLmxlbmd0aFxuICBpZiAoc3RyTGVuICUgMiAhPT0gMCkgdGhyb3cgbmV3IFR5cGVFcnJvcignSW52YWxpZCBoZXggc3RyaW5nJylcblxuICBpZiAobGVuZ3RoID4gc3RyTGVuIC8gMikge1xuICAgIGxlbmd0aCA9IHN0ckxlbiAvIDJcbiAgfVxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgKytpKSB7XG4gICAgdmFyIHBhcnNlZCA9IHBhcnNlSW50KHN0cmluZy5zdWJzdHIoaSAqIDIsIDIpLCAxNilcbiAgICBpZiAobnVtYmVySXNOYU4ocGFyc2VkKSkgcmV0dXJuIGlcbiAgICBidWZbb2Zmc2V0ICsgaV0gPSBwYXJzZWRcbiAgfVxuICByZXR1cm4gaVxufVxuXG5mdW5jdGlvbiB1dGY4V3JpdGUgKGJ1Ziwgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCkge1xuICByZXR1cm4gYmxpdEJ1ZmZlcih1dGY4VG9CeXRlcyhzdHJpbmcsIGJ1Zi5sZW5ndGggLSBvZmZzZXQpLCBidWYsIG9mZnNldCwgbGVuZ3RoKVxufVxuXG5mdW5jdGlvbiBhc2NpaVdyaXRlIChidWYsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgcmV0dXJuIGJsaXRCdWZmZXIoYXNjaWlUb0J5dGVzKHN0cmluZyksIGJ1Ziwgb2Zmc2V0LCBsZW5ndGgpXG59XG5cbmZ1bmN0aW9uIGxhdGluMVdyaXRlIChidWYsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgcmV0dXJuIGFzY2lpV3JpdGUoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKVxufVxuXG5mdW5jdGlvbiBiYXNlNjRXcml0ZSAoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIHJldHVybiBibGl0QnVmZmVyKGJhc2U2NFRvQnl0ZXMoc3RyaW5nKSwgYnVmLCBvZmZzZXQsIGxlbmd0aClcbn1cblxuZnVuY3Rpb24gdWNzMldyaXRlIChidWYsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgcmV0dXJuIGJsaXRCdWZmZXIodXRmMTZsZVRvQnl0ZXMoc3RyaW5nLCBidWYubGVuZ3RoIC0gb2Zmc2V0KSwgYnVmLCBvZmZzZXQsIGxlbmd0aClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZSA9IGZ1bmN0aW9uIHdyaXRlIChzdHJpbmcsIG9mZnNldCwgbGVuZ3RoLCBlbmNvZGluZykge1xuICAvLyBCdWZmZXIjd3JpdGUoc3RyaW5nKVxuICBpZiAob2Zmc2V0ID09PSB1bmRlZmluZWQpIHtcbiAgICBlbmNvZGluZyA9ICd1dGY4J1xuICAgIGxlbmd0aCA9IHRoaXMubGVuZ3RoXG4gICAgb2Zmc2V0ID0gMFxuICAvLyBCdWZmZXIjd3JpdGUoc3RyaW5nLCBlbmNvZGluZylcbiAgfSBlbHNlIGlmIChsZW5ndGggPT09IHVuZGVmaW5lZCAmJiB0eXBlb2Ygb2Zmc2V0ID09PSAnc3RyaW5nJykge1xuICAgIGVuY29kaW5nID0gb2Zmc2V0XG4gICAgbGVuZ3RoID0gdGhpcy5sZW5ndGhcbiAgICBvZmZzZXQgPSAwXG4gIC8vIEJ1ZmZlciN3cml0ZShzdHJpbmcsIG9mZnNldFssIGxlbmd0aF1bLCBlbmNvZGluZ10pXG4gIH0gZWxzZSBpZiAoaXNGaW5pdGUob2Zmc2V0KSkge1xuICAgIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICAgIGlmIChpc0Zpbml0ZShsZW5ndGgpKSB7XG4gICAgICBsZW5ndGggPSBsZW5ndGggPj4+IDBcbiAgICAgIGlmIChlbmNvZGluZyA9PT0gdW5kZWZpbmVkKSBlbmNvZGluZyA9ICd1dGY4J1xuICAgIH0gZWxzZSB7XG4gICAgICBlbmNvZGluZyA9IGxlbmd0aFxuICAgICAgbGVuZ3RoID0gdW5kZWZpbmVkXG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICdCdWZmZXIud3JpdGUoc3RyaW5nLCBlbmNvZGluZywgb2Zmc2V0WywgbGVuZ3RoXSkgaXMgbm8gbG9uZ2VyIHN1cHBvcnRlZCdcbiAgICApXG4gIH1cblxuICB2YXIgcmVtYWluaW5nID0gdGhpcy5sZW5ndGggLSBvZmZzZXRcbiAgaWYgKGxlbmd0aCA9PT0gdW5kZWZpbmVkIHx8IGxlbmd0aCA+IHJlbWFpbmluZykgbGVuZ3RoID0gcmVtYWluaW5nXG5cbiAgaWYgKChzdHJpbmcubGVuZ3RoID4gMCAmJiAobGVuZ3RoIDwgMCB8fCBvZmZzZXQgPCAwKSkgfHwgb2Zmc2V0ID4gdGhpcy5sZW5ndGgpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignQXR0ZW1wdCB0byB3cml0ZSBvdXRzaWRlIGJ1ZmZlciBib3VuZHMnKVxuICB9XG5cbiAgaWYgKCFlbmNvZGluZykgZW5jb2RpbmcgPSAndXRmOCdcblxuICB2YXIgbG93ZXJlZENhc2UgPSBmYWxzZVxuICBmb3IgKDs7KSB7XG4gICAgc3dpdGNoIChlbmNvZGluZykge1xuICAgICAgY2FzZSAnaGV4JzpcbiAgICAgICAgcmV0dXJuIGhleFdyaXRlKHRoaXMsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpXG5cbiAgICAgIGNhc2UgJ3V0ZjgnOlxuICAgICAgY2FzZSAndXRmLTgnOlxuICAgICAgICByZXR1cm4gdXRmOFdyaXRlKHRoaXMsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpXG5cbiAgICAgIGNhc2UgJ2FzY2lpJzpcbiAgICAgICAgcmV0dXJuIGFzY2lpV3JpdGUodGhpcywgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aClcblxuICAgICAgY2FzZSAnbGF0aW4xJzpcbiAgICAgIGNhc2UgJ2JpbmFyeSc6XG4gICAgICAgIHJldHVybiBsYXRpbjFXcml0ZSh0aGlzLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKVxuXG4gICAgICBjYXNlICdiYXNlNjQnOlxuICAgICAgICAvLyBXYXJuaW5nOiBtYXhMZW5ndGggbm90IHRha2VuIGludG8gYWNjb3VudCBpbiBiYXNlNjRXcml0ZVxuICAgICAgICByZXR1cm4gYmFzZTY0V3JpdGUodGhpcywgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aClcblxuICAgICAgY2FzZSAndWNzMic6XG4gICAgICBjYXNlICd1Y3MtMic6XG4gICAgICBjYXNlICd1dGYxNmxlJzpcbiAgICAgIGNhc2UgJ3V0Zi0xNmxlJzpcbiAgICAgICAgcmV0dXJuIHVjczJXcml0ZSh0aGlzLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKVxuXG4gICAgICBkZWZhdWx0OlxuICAgICAgICBpZiAobG93ZXJlZENhc2UpIHRocm93IG5ldyBUeXBlRXJyb3IoJ1Vua25vd24gZW5jb2Rpbmc6ICcgKyBlbmNvZGluZylcbiAgICAgICAgZW5jb2RpbmcgPSAoJycgKyBlbmNvZGluZykudG9Mb3dlckNhc2UoKVxuICAgICAgICBsb3dlcmVkQ2FzZSA9IHRydWVcbiAgICB9XG4gIH1cbn1cblxuQnVmZmVyLnByb3RvdHlwZS50b0pTT04gPSBmdW5jdGlvbiB0b0pTT04gKCkge1xuICByZXR1cm4ge1xuICAgIHR5cGU6ICdCdWZmZXInLFxuICAgIGRhdGE6IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKHRoaXMuX2FyciB8fCB0aGlzLCAwKVxuICB9XG59XG5cbmZ1bmN0aW9uIGJhc2U2NFNsaWNlIChidWYsIHN0YXJ0LCBlbmQpIHtcbiAgaWYgKHN0YXJ0ID09PSAwICYmIGVuZCA9PT0gYnVmLmxlbmd0aCkge1xuICAgIHJldHVybiBiYXNlNjQuZnJvbUJ5dGVBcnJheShidWYpXG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGJhc2U2NC5mcm9tQnl0ZUFycmF5KGJ1Zi5zbGljZShzdGFydCwgZW5kKSlcbiAgfVxufVxuXG5mdW5jdGlvbiB1dGY4U2xpY2UgKGJ1Ziwgc3RhcnQsIGVuZCkge1xuICBlbmQgPSBNYXRoLm1pbihidWYubGVuZ3RoLCBlbmQpXG4gIHZhciByZXMgPSBbXVxuXG4gIHZhciBpID0gc3RhcnRcbiAgd2hpbGUgKGkgPCBlbmQpIHtcbiAgICB2YXIgZmlyc3RCeXRlID0gYnVmW2ldXG4gICAgdmFyIGNvZGVQb2ludCA9IG51bGxcbiAgICB2YXIgYnl0ZXNQZXJTZXF1ZW5jZSA9IChmaXJzdEJ5dGUgPiAweEVGKSA/IDRcbiAgICAgIDogKGZpcnN0Qnl0ZSA+IDB4REYpID8gM1xuICAgICAgOiAoZmlyc3RCeXRlID4gMHhCRikgPyAyXG4gICAgICA6IDFcblxuICAgIGlmIChpICsgYnl0ZXNQZXJTZXF1ZW5jZSA8PSBlbmQpIHtcbiAgICAgIHZhciBzZWNvbmRCeXRlLCB0aGlyZEJ5dGUsIGZvdXJ0aEJ5dGUsIHRlbXBDb2RlUG9pbnRcblxuICAgICAgc3dpdGNoIChieXRlc1BlclNlcXVlbmNlKSB7XG4gICAgICAgIGNhc2UgMTpcbiAgICAgICAgICBpZiAoZmlyc3RCeXRlIDwgMHg4MCkge1xuICAgICAgICAgICAgY29kZVBvaW50ID0gZmlyc3RCeXRlXG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgMjpcbiAgICAgICAgICBzZWNvbmRCeXRlID0gYnVmW2kgKyAxXVxuICAgICAgICAgIGlmICgoc2Vjb25kQnl0ZSAmIDB4QzApID09PSAweDgwKSB7XG4gICAgICAgICAgICB0ZW1wQ29kZVBvaW50ID0gKGZpcnN0Qnl0ZSAmIDB4MUYpIDw8IDB4NiB8IChzZWNvbmRCeXRlICYgMHgzRilcbiAgICAgICAgICAgIGlmICh0ZW1wQ29kZVBvaW50ID4gMHg3Rikge1xuICAgICAgICAgICAgICBjb2RlUG9pbnQgPSB0ZW1wQ29kZVBvaW50XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgMzpcbiAgICAgICAgICBzZWNvbmRCeXRlID0gYnVmW2kgKyAxXVxuICAgICAgICAgIHRoaXJkQnl0ZSA9IGJ1ZltpICsgMl1cbiAgICAgICAgICBpZiAoKHNlY29uZEJ5dGUgJiAweEMwKSA9PT0gMHg4MCAmJiAodGhpcmRCeXRlICYgMHhDMCkgPT09IDB4ODApIHtcbiAgICAgICAgICAgIHRlbXBDb2RlUG9pbnQgPSAoZmlyc3RCeXRlICYgMHhGKSA8PCAweEMgfCAoc2Vjb25kQnl0ZSAmIDB4M0YpIDw8IDB4NiB8ICh0aGlyZEJ5dGUgJiAweDNGKVxuICAgICAgICAgICAgaWYgKHRlbXBDb2RlUG9pbnQgPiAweDdGRiAmJiAodGVtcENvZGVQb2ludCA8IDB4RDgwMCB8fCB0ZW1wQ29kZVBvaW50ID4gMHhERkZGKSkge1xuICAgICAgICAgICAgICBjb2RlUG9pbnQgPSB0ZW1wQ29kZVBvaW50XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgNDpcbiAgICAgICAgICBzZWNvbmRCeXRlID0gYnVmW2kgKyAxXVxuICAgICAgICAgIHRoaXJkQnl0ZSA9IGJ1ZltpICsgMl1cbiAgICAgICAgICBmb3VydGhCeXRlID0gYnVmW2kgKyAzXVxuICAgICAgICAgIGlmICgoc2Vjb25kQnl0ZSAmIDB4QzApID09PSAweDgwICYmICh0aGlyZEJ5dGUgJiAweEMwKSA9PT0gMHg4MCAmJiAoZm91cnRoQnl0ZSAmIDB4QzApID09PSAweDgwKSB7XG4gICAgICAgICAgICB0ZW1wQ29kZVBvaW50ID0gKGZpcnN0Qnl0ZSAmIDB4RikgPDwgMHgxMiB8IChzZWNvbmRCeXRlICYgMHgzRikgPDwgMHhDIHwgKHRoaXJkQnl0ZSAmIDB4M0YpIDw8IDB4NiB8IChmb3VydGhCeXRlICYgMHgzRilcbiAgICAgICAgICAgIGlmICh0ZW1wQ29kZVBvaW50ID4gMHhGRkZGICYmIHRlbXBDb2RlUG9pbnQgPCAweDExMDAwMCkge1xuICAgICAgICAgICAgICBjb2RlUG9pbnQgPSB0ZW1wQ29kZVBvaW50XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChjb2RlUG9pbnQgPT09IG51bGwpIHtcbiAgICAgIC8vIHdlIGRpZCBub3QgZ2VuZXJhdGUgYSB2YWxpZCBjb2RlUG9pbnQgc28gaW5zZXJ0IGFcbiAgICAgIC8vIHJlcGxhY2VtZW50IGNoYXIgKFUrRkZGRCkgYW5kIGFkdmFuY2Ugb25seSAxIGJ5dGVcbiAgICAgIGNvZGVQb2ludCA9IDB4RkZGRFxuICAgICAgYnl0ZXNQZXJTZXF1ZW5jZSA9IDFcbiAgICB9IGVsc2UgaWYgKGNvZGVQb2ludCA+IDB4RkZGRikge1xuICAgICAgLy8gZW5jb2RlIHRvIHV0ZjE2IChzdXJyb2dhdGUgcGFpciBkYW5jZSlcbiAgICAgIGNvZGVQb2ludCAtPSAweDEwMDAwXG4gICAgICByZXMucHVzaChjb2RlUG9pbnQgPj4+IDEwICYgMHgzRkYgfCAweEQ4MDApXG4gICAgICBjb2RlUG9pbnQgPSAweERDMDAgfCBjb2RlUG9pbnQgJiAweDNGRlxuICAgIH1cblxuICAgIHJlcy5wdXNoKGNvZGVQb2ludClcbiAgICBpICs9IGJ5dGVzUGVyU2VxdWVuY2VcbiAgfVxuXG4gIHJldHVybiBkZWNvZGVDb2RlUG9pbnRzQXJyYXkocmVzKVxufVxuXG4vLyBCYXNlZCBvbiBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8yMjc0NzI3Mi82ODA3NDIsIHRoZSBicm93c2VyIHdpdGhcbi8vIHRoZSBsb3dlc3QgbGltaXQgaXMgQ2hyb21lLCB3aXRoIDB4MTAwMDAgYXJncy5cbi8vIFdlIGdvIDEgbWFnbml0dWRlIGxlc3MsIGZvciBzYWZldHlcbnZhciBNQVhfQVJHVU1FTlRTX0xFTkdUSCA9IDB4MTAwMFxuXG5mdW5jdGlvbiBkZWNvZGVDb2RlUG9pbnRzQXJyYXkgKGNvZGVQb2ludHMpIHtcbiAgdmFyIGxlbiA9IGNvZGVQb2ludHMubGVuZ3RoXG4gIGlmIChsZW4gPD0gTUFYX0FSR1VNRU5UU19MRU5HVEgpIHtcbiAgICByZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZS5hcHBseShTdHJpbmcsIGNvZGVQb2ludHMpIC8vIGF2b2lkIGV4dHJhIHNsaWNlKClcbiAgfVxuXG4gIC8vIERlY29kZSBpbiBjaHVua3MgdG8gYXZvaWQgXCJjYWxsIHN0YWNrIHNpemUgZXhjZWVkZWRcIi5cbiAgdmFyIHJlcyA9ICcnXG4gIHZhciBpID0gMFxuICB3aGlsZSAoaSA8IGxlbikge1xuICAgIHJlcyArPSBTdHJpbmcuZnJvbUNoYXJDb2RlLmFwcGx5KFxuICAgICAgU3RyaW5nLFxuICAgICAgY29kZVBvaW50cy5zbGljZShpLCBpICs9IE1BWF9BUkdVTUVOVFNfTEVOR1RIKVxuICAgIClcbiAgfVxuICByZXR1cm4gcmVzXG59XG5cbmZ1bmN0aW9uIGFzY2lpU2xpY2UgKGJ1Ziwgc3RhcnQsIGVuZCkge1xuICB2YXIgcmV0ID0gJydcbiAgZW5kID0gTWF0aC5taW4oYnVmLmxlbmd0aCwgZW5kKVxuXG4gIGZvciAodmFyIGkgPSBzdGFydDsgaSA8IGVuZDsgKytpKSB7XG4gICAgcmV0ICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoYnVmW2ldICYgMHg3RilcbiAgfVxuICByZXR1cm4gcmV0XG59XG5cbmZ1bmN0aW9uIGxhdGluMVNsaWNlIChidWYsIHN0YXJ0LCBlbmQpIHtcbiAgdmFyIHJldCA9ICcnXG4gIGVuZCA9IE1hdGgubWluKGJ1Zi5sZW5ndGgsIGVuZClcblxuICBmb3IgKHZhciBpID0gc3RhcnQ7IGkgPCBlbmQ7ICsraSkge1xuICAgIHJldCArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGJ1ZltpXSlcbiAgfVxuICByZXR1cm4gcmV0XG59XG5cbmZ1bmN0aW9uIGhleFNsaWNlIChidWYsIHN0YXJ0LCBlbmQpIHtcbiAgdmFyIGxlbiA9IGJ1Zi5sZW5ndGhcblxuICBpZiAoIXN0YXJ0IHx8IHN0YXJ0IDwgMCkgc3RhcnQgPSAwXG4gIGlmICghZW5kIHx8IGVuZCA8IDAgfHwgZW5kID4gbGVuKSBlbmQgPSBsZW5cblxuICB2YXIgb3V0ID0gJydcbiAgZm9yICh2YXIgaSA9IHN0YXJ0OyBpIDwgZW5kOyArK2kpIHtcbiAgICBvdXQgKz0gdG9IZXgoYnVmW2ldKVxuICB9XG4gIHJldHVybiBvdXRcbn1cblxuZnVuY3Rpb24gdXRmMTZsZVNsaWNlIChidWYsIHN0YXJ0LCBlbmQpIHtcbiAgdmFyIGJ5dGVzID0gYnVmLnNsaWNlKHN0YXJ0LCBlbmQpXG4gIHZhciByZXMgPSAnJ1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGJ5dGVzLmxlbmd0aDsgaSArPSAyKSB7XG4gICAgcmVzICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoYnl0ZXNbaV0gKyAoYnl0ZXNbaSArIDFdICogMjU2KSlcbiAgfVxuICByZXR1cm4gcmVzXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUuc2xpY2UgPSBmdW5jdGlvbiBzbGljZSAoc3RhcnQsIGVuZCkge1xuICB2YXIgbGVuID0gdGhpcy5sZW5ndGhcbiAgc3RhcnQgPSB+fnN0YXJ0XG4gIGVuZCA9IGVuZCA9PT0gdW5kZWZpbmVkID8gbGVuIDogfn5lbmRcblxuICBpZiAoc3RhcnQgPCAwKSB7XG4gICAgc3RhcnQgKz0gbGVuXG4gICAgaWYgKHN0YXJ0IDwgMCkgc3RhcnQgPSAwXG4gIH0gZWxzZSBpZiAoc3RhcnQgPiBsZW4pIHtcbiAgICBzdGFydCA9IGxlblxuICB9XG5cbiAgaWYgKGVuZCA8IDApIHtcbiAgICBlbmQgKz0gbGVuXG4gICAgaWYgKGVuZCA8IDApIGVuZCA9IDBcbiAgfSBlbHNlIGlmIChlbmQgPiBsZW4pIHtcbiAgICBlbmQgPSBsZW5cbiAgfVxuXG4gIGlmIChlbmQgPCBzdGFydCkgZW5kID0gc3RhcnRcblxuICB2YXIgbmV3QnVmID0gdGhpcy5zdWJhcnJheShzdGFydCwgZW5kKVxuICAvLyBSZXR1cm4gYW4gYXVnbWVudGVkIGBVaW50OEFycmF5YCBpbnN0YW5jZVxuICBuZXdCdWYuX19wcm90b19fID0gQnVmZmVyLnByb3RvdHlwZVxuICByZXR1cm4gbmV3QnVmXG59XG5cbi8qXG4gKiBOZWVkIHRvIG1ha2Ugc3VyZSB0aGF0IGJ1ZmZlciBpc24ndCB0cnlpbmcgdG8gd3JpdGUgb3V0IG9mIGJvdW5kcy5cbiAqL1xuZnVuY3Rpb24gY2hlY2tPZmZzZXQgKG9mZnNldCwgZXh0LCBsZW5ndGgpIHtcbiAgaWYgKChvZmZzZXQgJSAxKSAhPT0gMCB8fCBvZmZzZXQgPCAwKSB0aHJvdyBuZXcgUmFuZ2VFcnJvcignb2Zmc2V0IGlzIG5vdCB1aW50JylcbiAgaWYgKG9mZnNldCArIGV4dCA+IGxlbmd0aCkgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ1RyeWluZyB0byBhY2Nlc3MgYmV5b25kIGJ1ZmZlciBsZW5ndGgnKVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRVSW50TEUgPSBmdW5jdGlvbiByZWFkVUludExFIChvZmZzZXQsIGJ5dGVMZW5ndGgsIG5vQXNzZXJ0KSB7XG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBieXRlTGVuZ3RoID0gYnl0ZUxlbmd0aCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIGJ5dGVMZW5ndGgsIHRoaXMubGVuZ3RoKVxuXG4gIHZhciB2YWwgPSB0aGlzW29mZnNldF1cbiAgdmFyIG11bCA9IDFcbiAgdmFyIGkgPSAwXG4gIHdoaWxlICgrK2kgPCBieXRlTGVuZ3RoICYmIChtdWwgKj0gMHgxMDApKSB7XG4gICAgdmFsICs9IHRoaXNbb2Zmc2V0ICsgaV0gKiBtdWxcbiAgfVxuXG4gIHJldHVybiB2YWxcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVUludEJFID0gZnVuY3Rpb24gcmVhZFVJbnRCRSAob2Zmc2V0LCBieXRlTGVuZ3RoLCBub0Fzc2VydCkge1xuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgYnl0ZUxlbmd0aCA9IGJ5dGVMZW5ndGggPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGNoZWNrT2Zmc2V0KG9mZnNldCwgYnl0ZUxlbmd0aCwgdGhpcy5sZW5ndGgpXG4gIH1cblxuICB2YXIgdmFsID0gdGhpc1tvZmZzZXQgKyAtLWJ5dGVMZW5ndGhdXG4gIHZhciBtdWwgPSAxXG4gIHdoaWxlIChieXRlTGVuZ3RoID4gMCAmJiAobXVsICo9IDB4MTAwKSkge1xuICAgIHZhbCArPSB0aGlzW29mZnNldCArIC0tYnl0ZUxlbmd0aF0gKiBtdWxcbiAgfVxuXG4gIHJldHVybiB2YWxcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVUludDggPSBmdW5jdGlvbiByZWFkVUludDggKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgMSwgdGhpcy5sZW5ndGgpXG4gIHJldHVybiB0aGlzW29mZnNldF1cbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVUludDE2TEUgPSBmdW5jdGlvbiByZWFkVUludDE2TEUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgMiwgdGhpcy5sZW5ndGgpXG4gIHJldHVybiB0aGlzW29mZnNldF0gfCAodGhpc1tvZmZzZXQgKyAxXSA8PCA4KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRVSW50MTZCRSA9IGZ1bmN0aW9uIHJlYWRVSW50MTZCRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCAyLCB0aGlzLmxlbmd0aClcbiAgcmV0dXJuICh0aGlzW29mZnNldF0gPDwgOCkgfCB0aGlzW29mZnNldCArIDFdXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVJbnQzMkxFID0gZnVuY3Rpb24gcmVhZFVJbnQzMkxFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDQsIHRoaXMubGVuZ3RoKVxuXG4gIHJldHVybiAoKHRoaXNbb2Zmc2V0XSkgfFxuICAgICAgKHRoaXNbb2Zmc2V0ICsgMV0gPDwgOCkgfFxuICAgICAgKHRoaXNbb2Zmc2V0ICsgMl0gPDwgMTYpKSArXG4gICAgICAodGhpc1tvZmZzZXQgKyAzXSAqIDB4MTAwMDAwMClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVUludDMyQkUgPSBmdW5jdGlvbiByZWFkVUludDMyQkUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgNCwgdGhpcy5sZW5ndGgpXG5cbiAgcmV0dXJuICh0aGlzW29mZnNldF0gKiAweDEwMDAwMDApICtcbiAgICAoKHRoaXNbb2Zmc2V0ICsgMV0gPDwgMTYpIHxcbiAgICAodGhpc1tvZmZzZXQgKyAyXSA8PCA4KSB8XG4gICAgdGhpc1tvZmZzZXQgKyAzXSlcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkSW50TEUgPSBmdW5jdGlvbiByZWFkSW50TEUgKG9mZnNldCwgYnl0ZUxlbmd0aCwgbm9Bc3NlcnQpIHtcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGJ5dGVMZW5ndGggPSBieXRlTGVuZ3RoID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgYnl0ZUxlbmd0aCwgdGhpcy5sZW5ndGgpXG5cbiAgdmFyIHZhbCA9IHRoaXNbb2Zmc2V0XVxuICB2YXIgbXVsID0gMVxuICB2YXIgaSA9IDBcbiAgd2hpbGUgKCsraSA8IGJ5dGVMZW5ndGggJiYgKG11bCAqPSAweDEwMCkpIHtcbiAgICB2YWwgKz0gdGhpc1tvZmZzZXQgKyBpXSAqIG11bFxuICB9XG4gIG11bCAqPSAweDgwXG5cbiAgaWYgKHZhbCA+PSBtdWwpIHZhbCAtPSBNYXRoLnBvdygyLCA4ICogYnl0ZUxlbmd0aClcblxuICByZXR1cm4gdmFsXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEludEJFID0gZnVuY3Rpb24gcmVhZEludEJFIChvZmZzZXQsIGJ5dGVMZW5ndGgsIG5vQXNzZXJ0KSB7XG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBieXRlTGVuZ3RoID0gYnl0ZUxlbmd0aCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIGJ5dGVMZW5ndGgsIHRoaXMubGVuZ3RoKVxuXG4gIHZhciBpID0gYnl0ZUxlbmd0aFxuICB2YXIgbXVsID0gMVxuICB2YXIgdmFsID0gdGhpc1tvZmZzZXQgKyAtLWldXG4gIHdoaWxlIChpID4gMCAmJiAobXVsICo9IDB4MTAwKSkge1xuICAgIHZhbCArPSB0aGlzW29mZnNldCArIC0taV0gKiBtdWxcbiAgfVxuICBtdWwgKj0gMHg4MFxuXG4gIGlmICh2YWwgPj0gbXVsKSB2YWwgLT0gTWF0aC5wb3coMiwgOCAqIGJ5dGVMZW5ndGgpXG5cbiAgcmV0dXJuIHZhbFxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRJbnQ4ID0gZnVuY3Rpb24gcmVhZEludDggKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgMSwgdGhpcy5sZW5ndGgpXG4gIGlmICghKHRoaXNbb2Zmc2V0XSAmIDB4ODApKSByZXR1cm4gKHRoaXNbb2Zmc2V0XSlcbiAgcmV0dXJuICgoMHhmZiAtIHRoaXNbb2Zmc2V0XSArIDEpICogLTEpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEludDE2TEUgPSBmdW5jdGlvbiByZWFkSW50MTZMRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCAyLCB0aGlzLmxlbmd0aClcbiAgdmFyIHZhbCA9IHRoaXNbb2Zmc2V0XSB8ICh0aGlzW29mZnNldCArIDFdIDw8IDgpXG4gIHJldHVybiAodmFsICYgMHg4MDAwKSA/IHZhbCB8IDB4RkZGRjAwMDAgOiB2YWxcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkSW50MTZCRSA9IGZ1bmN0aW9uIHJlYWRJbnQxNkJFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDIsIHRoaXMubGVuZ3RoKVxuICB2YXIgdmFsID0gdGhpc1tvZmZzZXQgKyAxXSB8ICh0aGlzW29mZnNldF0gPDwgOClcbiAgcmV0dXJuICh2YWwgJiAweDgwMDApID8gdmFsIHwgMHhGRkZGMDAwMCA6IHZhbFxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRJbnQzMkxFID0gZnVuY3Rpb24gcmVhZEludDMyTEUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgNCwgdGhpcy5sZW5ndGgpXG5cbiAgcmV0dXJuICh0aGlzW29mZnNldF0pIHxcbiAgICAodGhpc1tvZmZzZXQgKyAxXSA8PCA4KSB8XG4gICAgKHRoaXNbb2Zmc2V0ICsgMl0gPDwgMTYpIHxcbiAgICAodGhpc1tvZmZzZXQgKyAzXSA8PCAyNClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkSW50MzJCRSA9IGZ1bmN0aW9uIHJlYWRJbnQzMkJFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDQsIHRoaXMubGVuZ3RoKVxuXG4gIHJldHVybiAodGhpc1tvZmZzZXRdIDw8IDI0KSB8XG4gICAgKHRoaXNbb2Zmc2V0ICsgMV0gPDwgMTYpIHxcbiAgICAodGhpc1tvZmZzZXQgKyAyXSA8PCA4KSB8XG4gICAgKHRoaXNbb2Zmc2V0ICsgM10pXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEZsb2F0TEUgPSBmdW5jdGlvbiByZWFkRmxvYXRMRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCA0LCB0aGlzLmxlbmd0aClcbiAgcmV0dXJuIGllZWU3NTQucmVhZCh0aGlzLCBvZmZzZXQsIHRydWUsIDIzLCA0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRGbG9hdEJFID0gZnVuY3Rpb24gcmVhZEZsb2F0QkUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgNCwgdGhpcy5sZW5ndGgpXG4gIHJldHVybiBpZWVlNzU0LnJlYWQodGhpcywgb2Zmc2V0LCBmYWxzZSwgMjMsIDQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZERvdWJsZUxFID0gZnVuY3Rpb24gcmVhZERvdWJsZUxFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDgsIHRoaXMubGVuZ3RoKVxuICByZXR1cm4gaWVlZTc1NC5yZWFkKHRoaXMsIG9mZnNldCwgdHJ1ZSwgNTIsIDgpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZERvdWJsZUJFID0gZnVuY3Rpb24gcmVhZERvdWJsZUJFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDgsIHRoaXMubGVuZ3RoKVxuICByZXR1cm4gaWVlZTc1NC5yZWFkKHRoaXMsIG9mZnNldCwgZmFsc2UsIDUyLCA4KVxufVxuXG5mdW5jdGlvbiBjaGVja0ludCAoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBleHQsIG1heCwgbWluKSB7XG4gIGlmICghQnVmZmVyLmlzQnVmZmVyKGJ1ZikpIHRocm93IG5ldyBUeXBlRXJyb3IoJ1wiYnVmZmVyXCIgYXJndW1lbnQgbXVzdCBiZSBhIEJ1ZmZlciBpbnN0YW5jZScpXG4gIGlmICh2YWx1ZSA+IG1heCB8fCB2YWx1ZSA8IG1pbikgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ1widmFsdWVcIiBhcmd1bWVudCBpcyBvdXQgb2YgYm91bmRzJylcbiAgaWYgKG9mZnNldCArIGV4dCA+IGJ1Zi5sZW5ndGgpIHRocm93IG5ldyBSYW5nZUVycm9yKCdJbmRleCBvdXQgb2YgcmFuZ2UnKVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlVUludExFID0gZnVuY3Rpb24gd3JpdGVVSW50TEUgKHZhbHVlLCBvZmZzZXQsIGJ5dGVMZW5ndGgsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBieXRlTGVuZ3RoID0gYnl0ZUxlbmd0aCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgdmFyIG1heEJ5dGVzID0gTWF0aC5wb3coMiwgOCAqIGJ5dGVMZW5ndGgpIC0gMVxuICAgIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIGJ5dGVMZW5ndGgsIG1heEJ5dGVzLCAwKVxuICB9XG5cbiAgdmFyIG11bCA9IDFcbiAgdmFyIGkgPSAwXG4gIHRoaXNbb2Zmc2V0XSA9IHZhbHVlICYgMHhGRlxuICB3aGlsZSAoKytpIDwgYnl0ZUxlbmd0aCAmJiAobXVsICo9IDB4MTAwKSkge1xuICAgIHRoaXNbb2Zmc2V0ICsgaV0gPSAodmFsdWUgLyBtdWwpICYgMHhGRlxuICB9XG5cbiAgcmV0dXJuIG9mZnNldCArIGJ5dGVMZW5ndGhcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnRCRSA9IGZ1bmN0aW9uIHdyaXRlVUludEJFICh2YWx1ZSwgb2Zmc2V0LCBieXRlTGVuZ3RoLCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgYnl0ZUxlbmd0aCA9IGJ5dGVMZW5ndGggPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIHZhciBtYXhCeXRlcyA9IE1hdGgucG93KDIsIDggKiBieXRlTGVuZ3RoKSAtIDFcbiAgICBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBieXRlTGVuZ3RoLCBtYXhCeXRlcywgMClcbiAgfVxuXG4gIHZhciBpID0gYnl0ZUxlbmd0aCAtIDFcbiAgdmFyIG11bCA9IDFcbiAgdGhpc1tvZmZzZXQgKyBpXSA9IHZhbHVlICYgMHhGRlxuICB3aGlsZSAoLS1pID49IDAgJiYgKG11bCAqPSAweDEwMCkpIHtcbiAgICB0aGlzW29mZnNldCArIGldID0gKHZhbHVlIC8gbXVsKSAmIDB4RkZcbiAgfVxuXG4gIHJldHVybiBvZmZzZXQgKyBieXRlTGVuZ3RoXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVSW50OCA9IGZ1bmN0aW9uIHdyaXRlVUludDggKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCAxLCAweGZmLCAwKVxuICB0aGlzW29mZnNldF0gPSAodmFsdWUgJiAweGZmKVxuICByZXR1cm4gb2Zmc2V0ICsgMVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlVUludDE2TEUgPSBmdW5jdGlvbiB3cml0ZVVJbnQxNkxFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgMiwgMHhmZmZmLCAwKVxuICB0aGlzW29mZnNldF0gPSAodmFsdWUgJiAweGZmKVxuICB0aGlzW29mZnNldCArIDFdID0gKHZhbHVlID4+PiA4KVxuICByZXR1cm4gb2Zmc2V0ICsgMlxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlVUludDE2QkUgPSBmdW5jdGlvbiB3cml0ZVVJbnQxNkJFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgMiwgMHhmZmZmLCAwKVxuICB0aGlzW29mZnNldF0gPSAodmFsdWUgPj4+IDgpXG4gIHRoaXNbb2Zmc2V0ICsgMV0gPSAodmFsdWUgJiAweGZmKVxuICByZXR1cm4gb2Zmc2V0ICsgMlxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlVUludDMyTEUgPSBmdW5jdGlvbiB3cml0ZVVJbnQzMkxFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgNCwgMHhmZmZmZmZmZiwgMClcbiAgdGhpc1tvZmZzZXQgKyAzXSA9ICh2YWx1ZSA+Pj4gMjQpXG4gIHRoaXNbb2Zmc2V0ICsgMl0gPSAodmFsdWUgPj4+IDE2KVxuICB0aGlzW29mZnNldCArIDFdID0gKHZhbHVlID4+PiA4KVxuICB0aGlzW29mZnNldF0gPSAodmFsdWUgJiAweGZmKVxuICByZXR1cm4gb2Zmc2V0ICsgNFxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlVUludDMyQkUgPSBmdW5jdGlvbiB3cml0ZVVJbnQzMkJFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgNCwgMHhmZmZmZmZmZiwgMClcbiAgdGhpc1tvZmZzZXRdID0gKHZhbHVlID4+PiAyNClcbiAgdGhpc1tvZmZzZXQgKyAxXSA9ICh2YWx1ZSA+Pj4gMTYpXG4gIHRoaXNbb2Zmc2V0ICsgMl0gPSAodmFsdWUgPj4+IDgpXG4gIHRoaXNbb2Zmc2V0ICsgM10gPSAodmFsdWUgJiAweGZmKVxuICByZXR1cm4gb2Zmc2V0ICsgNFxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlSW50TEUgPSBmdW5jdGlvbiB3cml0ZUludExFICh2YWx1ZSwgb2Zmc2V0LCBieXRlTGVuZ3RoLCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIHZhciBsaW1pdCA9IE1hdGgucG93KDIsICg4ICogYnl0ZUxlbmd0aCkgLSAxKVxuXG4gICAgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgYnl0ZUxlbmd0aCwgbGltaXQgLSAxLCAtbGltaXQpXG4gIH1cblxuICB2YXIgaSA9IDBcbiAgdmFyIG11bCA9IDFcbiAgdmFyIHN1YiA9IDBcbiAgdGhpc1tvZmZzZXRdID0gdmFsdWUgJiAweEZGXG4gIHdoaWxlICgrK2kgPCBieXRlTGVuZ3RoICYmIChtdWwgKj0gMHgxMDApKSB7XG4gICAgaWYgKHZhbHVlIDwgMCAmJiBzdWIgPT09IDAgJiYgdGhpc1tvZmZzZXQgKyBpIC0gMV0gIT09IDApIHtcbiAgICAgIHN1YiA9IDFcbiAgICB9XG4gICAgdGhpc1tvZmZzZXQgKyBpXSA9ICgodmFsdWUgLyBtdWwpID4+IDApIC0gc3ViICYgMHhGRlxuICB9XG5cbiAgcmV0dXJuIG9mZnNldCArIGJ5dGVMZW5ndGhcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUludEJFID0gZnVuY3Rpb24gd3JpdGVJbnRCRSAodmFsdWUsIG9mZnNldCwgYnl0ZUxlbmd0aCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICB2YXIgbGltaXQgPSBNYXRoLnBvdygyLCAoOCAqIGJ5dGVMZW5ndGgpIC0gMSlcblxuICAgIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIGJ5dGVMZW5ndGgsIGxpbWl0IC0gMSwgLWxpbWl0KVxuICB9XG5cbiAgdmFyIGkgPSBieXRlTGVuZ3RoIC0gMVxuICB2YXIgbXVsID0gMVxuICB2YXIgc3ViID0gMFxuICB0aGlzW29mZnNldCArIGldID0gdmFsdWUgJiAweEZGXG4gIHdoaWxlICgtLWkgPj0gMCAmJiAobXVsICo9IDB4MTAwKSkge1xuICAgIGlmICh2YWx1ZSA8IDAgJiYgc3ViID09PSAwICYmIHRoaXNbb2Zmc2V0ICsgaSArIDFdICE9PSAwKSB7XG4gICAgICBzdWIgPSAxXG4gICAgfVxuICAgIHRoaXNbb2Zmc2V0ICsgaV0gPSAoKHZhbHVlIC8gbXVsKSA+PiAwKSAtIHN1YiAmIDB4RkZcbiAgfVxuXG4gIHJldHVybiBvZmZzZXQgKyBieXRlTGVuZ3RoXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVJbnQ4ID0gZnVuY3Rpb24gd3JpdGVJbnQ4ICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgMSwgMHg3ZiwgLTB4ODApXG4gIGlmICh2YWx1ZSA8IDApIHZhbHVlID0gMHhmZiArIHZhbHVlICsgMVxuICB0aGlzW29mZnNldF0gPSAodmFsdWUgJiAweGZmKVxuICByZXR1cm4gb2Zmc2V0ICsgMVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlSW50MTZMRSA9IGZ1bmN0aW9uIHdyaXRlSW50MTZMRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDIsIDB4N2ZmZiwgLTB4ODAwMClcbiAgdGhpc1tvZmZzZXRdID0gKHZhbHVlICYgMHhmZilcbiAgdGhpc1tvZmZzZXQgKyAxXSA9ICh2YWx1ZSA+Pj4gOClcbiAgcmV0dXJuIG9mZnNldCArIDJcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUludDE2QkUgPSBmdW5jdGlvbiB3cml0ZUludDE2QkUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCAyLCAweDdmZmYsIC0weDgwMDApXG4gIHRoaXNbb2Zmc2V0XSA9ICh2YWx1ZSA+Pj4gOClcbiAgdGhpc1tvZmZzZXQgKyAxXSA9ICh2YWx1ZSAmIDB4ZmYpXG4gIHJldHVybiBvZmZzZXQgKyAyXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVJbnQzMkxFID0gZnVuY3Rpb24gd3JpdGVJbnQzMkxFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgNCwgMHg3ZmZmZmZmZiwgLTB4ODAwMDAwMDApXG4gIHRoaXNbb2Zmc2V0XSA9ICh2YWx1ZSAmIDB4ZmYpXG4gIHRoaXNbb2Zmc2V0ICsgMV0gPSAodmFsdWUgPj4+IDgpXG4gIHRoaXNbb2Zmc2V0ICsgMl0gPSAodmFsdWUgPj4+IDE2KVxuICB0aGlzW29mZnNldCArIDNdID0gKHZhbHVlID4+PiAyNClcbiAgcmV0dXJuIG9mZnNldCArIDRcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUludDMyQkUgPSBmdW5jdGlvbiB3cml0ZUludDMyQkUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCA0LCAweDdmZmZmZmZmLCAtMHg4MDAwMDAwMClcbiAgaWYgKHZhbHVlIDwgMCkgdmFsdWUgPSAweGZmZmZmZmZmICsgdmFsdWUgKyAxXG4gIHRoaXNbb2Zmc2V0XSA9ICh2YWx1ZSA+Pj4gMjQpXG4gIHRoaXNbb2Zmc2V0ICsgMV0gPSAodmFsdWUgPj4+IDE2KVxuICB0aGlzW29mZnNldCArIDJdID0gKHZhbHVlID4+PiA4KVxuICB0aGlzW29mZnNldCArIDNdID0gKHZhbHVlICYgMHhmZilcbiAgcmV0dXJuIG9mZnNldCArIDRcbn1cblxuZnVuY3Rpb24gY2hlY2tJRUVFNzU0IChidWYsIHZhbHVlLCBvZmZzZXQsIGV4dCwgbWF4LCBtaW4pIHtcbiAgaWYgKG9mZnNldCArIGV4dCA+IGJ1Zi5sZW5ndGgpIHRocm93IG5ldyBSYW5nZUVycm9yKCdJbmRleCBvdXQgb2YgcmFuZ2UnKVxuICBpZiAob2Zmc2V0IDwgMCkgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0luZGV4IG91dCBvZiByYW5nZScpXG59XG5cbmZ1bmN0aW9uIHdyaXRlRmxvYXQgKGJ1ZiwgdmFsdWUsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGNoZWNrSUVFRTc1NChidWYsIHZhbHVlLCBvZmZzZXQsIDQsIDMuNDAyODIzNDY2Mzg1Mjg4NmUrMzgsIC0zLjQwMjgyMzQ2NjM4NTI4ODZlKzM4KVxuICB9XG4gIGllZWU3NTQud3JpdGUoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIDIzLCA0KVxuICByZXR1cm4gb2Zmc2V0ICsgNFxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlRmxvYXRMRSA9IGZ1bmN0aW9uIHdyaXRlRmxvYXRMRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgcmV0dXJuIHdyaXRlRmxvYXQodGhpcywgdmFsdWUsIG9mZnNldCwgdHJ1ZSwgbm9Bc3NlcnQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVGbG9hdEJFID0gZnVuY3Rpb24gd3JpdGVGbG9hdEJFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICByZXR1cm4gd3JpdGVGbG9hdCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBmYWxzZSwgbm9Bc3NlcnQpXG59XG5cbmZ1bmN0aW9uIHdyaXRlRG91YmxlIChidWYsIHZhbHVlLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBjaGVja0lFRUU3NTQoYnVmLCB2YWx1ZSwgb2Zmc2V0LCA4LCAxLjc5NzY5MzEzNDg2MjMxNTdFKzMwOCwgLTEuNzk3NjkzMTM0ODYyMzE1N0UrMzA4KVxuICB9XG4gIGllZWU3NTQud3JpdGUoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIDUyLCA4KVxuICByZXR1cm4gb2Zmc2V0ICsgOFxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlRG91YmxlTEUgPSBmdW5jdGlvbiB3cml0ZURvdWJsZUxFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICByZXR1cm4gd3JpdGVEb3VibGUodGhpcywgdmFsdWUsIG9mZnNldCwgdHJ1ZSwgbm9Bc3NlcnQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVEb3VibGVCRSA9IGZ1bmN0aW9uIHdyaXRlRG91YmxlQkUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHJldHVybiB3cml0ZURvdWJsZSh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBmYWxzZSwgbm9Bc3NlcnQpXG59XG5cbi8vIGNvcHkodGFyZ2V0QnVmZmVyLCB0YXJnZXRTdGFydD0wLCBzb3VyY2VTdGFydD0wLCBzb3VyY2VFbmQ9YnVmZmVyLmxlbmd0aClcbkJ1ZmZlci5wcm90b3R5cGUuY29weSA9IGZ1bmN0aW9uIGNvcHkgKHRhcmdldCwgdGFyZ2V0U3RhcnQsIHN0YXJ0LCBlbmQpIHtcbiAgaWYgKCFzdGFydCkgc3RhcnQgPSAwXG4gIGlmICghZW5kICYmIGVuZCAhPT0gMCkgZW5kID0gdGhpcy5sZW5ndGhcbiAgaWYgKHRhcmdldFN0YXJ0ID49IHRhcmdldC5sZW5ndGgpIHRhcmdldFN0YXJ0ID0gdGFyZ2V0Lmxlbmd0aFxuICBpZiAoIXRhcmdldFN0YXJ0KSB0YXJnZXRTdGFydCA9IDBcbiAgaWYgKGVuZCA+IDAgJiYgZW5kIDwgc3RhcnQpIGVuZCA9IHN0YXJ0XG5cbiAgLy8gQ29weSAwIGJ5dGVzOyB3ZSdyZSBkb25lXG4gIGlmIChlbmQgPT09IHN0YXJ0KSByZXR1cm4gMFxuICBpZiAodGFyZ2V0Lmxlbmd0aCA9PT0gMCB8fCB0aGlzLmxlbmd0aCA9PT0gMCkgcmV0dXJuIDBcblxuICAvLyBGYXRhbCBlcnJvciBjb25kaXRpb25zXG4gIGlmICh0YXJnZXRTdGFydCA8IDApIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcigndGFyZ2V0U3RhcnQgb3V0IG9mIGJvdW5kcycpXG4gIH1cbiAgaWYgKHN0YXJ0IDwgMCB8fCBzdGFydCA+PSB0aGlzLmxlbmd0aCkgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ3NvdXJjZVN0YXJ0IG91dCBvZiBib3VuZHMnKVxuICBpZiAoZW5kIDwgMCkgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ3NvdXJjZUVuZCBvdXQgb2YgYm91bmRzJylcblxuICAvLyBBcmUgd2Ugb29iP1xuICBpZiAoZW5kID4gdGhpcy5sZW5ndGgpIGVuZCA9IHRoaXMubGVuZ3RoXG4gIGlmICh0YXJnZXQubGVuZ3RoIC0gdGFyZ2V0U3RhcnQgPCBlbmQgLSBzdGFydCkge1xuICAgIGVuZCA9IHRhcmdldC5sZW5ndGggLSB0YXJnZXRTdGFydCArIHN0YXJ0XG4gIH1cblxuICB2YXIgbGVuID0gZW5kIC0gc3RhcnRcbiAgdmFyIGlcblxuICBpZiAodGhpcyA9PT0gdGFyZ2V0ICYmIHN0YXJ0IDwgdGFyZ2V0U3RhcnQgJiYgdGFyZ2V0U3RhcnQgPCBlbmQpIHtcbiAgICAvLyBkZXNjZW5kaW5nIGNvcHkgZnJvbSBlbmRcbiAgICBmb3IgKGkgPSBsZW4gLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgdGFyZ2V0W2kgKyB0YXJnZXRTdGFydF0gPSB0aGlzW2kgKyBzdGFydF1cbiAgICB9XG4gIH0gZWxzZSBpZiAobGVuIDwgMTAwMCkge1xuICAgIC8vIGFzY2VuZGluZyBjb3B5IGZyb20gc3RhcnRcbiAgICBmb3IgKGkgPSAwOyBpIDwgbGVuOyArK2kpIHtcbiAgICAgIHRhcmdldFtpICsgdGFyZ2V0U3RhcnRdID0gdGhpc1tpICsgc3RhcnRdXG4gICAgfVxuICB9IGVsc2Uge1xuICAgIFVpbnQ4QXJyYXkucHJvdG90eXBlLnNldC5jYWxsKFxuICAgICAgdGFyZ2V0LFxuICAgICAgdGhpcy5zdWJhcnJheShzdGFydCwgc3RhcnQgKyBsZW4pLFxuICAgICAgdGFyZ2V0U3RhcnRcbiAgICApXG4gIH1cblxuICByZXR1cm4gbGVuXG59XG5cbi8vIFVzYWdlOlxuLy8gICAgYnVmZmVyLmZpbGwobnVtYmVyWywgb2Zmc2V0WywgZW5kXV0pXG4vLyAgICBidWZmZXIuZmlsbChidWZmZXJbLCBvZmZzZXRbLCBlbmRdXSlcbi8vICAgIGJ1ZmZlci5maWxsKHN0cmluZ1ssIG9mZnNldFssIGVuZF1dWywgZW5jb2RpbmddKVxuQnVmZmVyLnByb3RvdHlwZS5maWxsID0gZnVuY3Rpb24gZmlsbCAodmFsLCBzdGFydCwgZW5kLCBlbmNvZGluZykge1xuICAvLyBIYW5kbGUgc3RyaW5nIGNhc2VzOlxuICBpZiAodHlwZW9mIHZhbCA9PT0gJ3N0cmluZycpIHtcbiAgICBpZiAodHlwZW9mIHN0YXJ0ID09PSAnc3RyaW5nJykge1xuICAgICAgZW5jb2RpbmcgPSBzdGFydFxuICAgICAgc3RhcnQgPSAwXG4gICAgICBlbmQgPSB0aGlzLmxlbmd0aFxuICAgIH0gZWxzZSBpZiAodHlwZW9mIGVuZCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGVuY29kaW5nID0gZW5kXG4gICAgICBlbmQgPSB0aGlzLmxlbmd0aFxuICAgIH1cbiAgICBpZiAodmFsLmxlbmd0aCA9PT0gMSkge1xuICAgICAgdmFyIGNvZGUgPSB2YWwuY2hhckNvZGVBdCgwKVxuICAgICAgaWYgKGNvZGUgPCAyNTYpIHtcbiAgICAgICAgdmFsID0gY29kZVxuICAgICAgfVxuICAgIH1cbiAgICBpZiAoZW5jb2RpbmcgIT09IHVuZGVmaW5lZCAmJiB0eXBlb2YgZW5jb2RpbmcgIT09ICdzdHJpbmcnKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdlbmNvZGluZyBtdXN0IGJlIGEgc3RyaW5nJylcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBlbmNvZGluZyA9PT0gJ3N0cmluZycgJiYgIUJ1ZmZlci5pc0VuY29kaW5nKGVuY29kaW5nKSkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVW5rbm93biBlbmNvZGluZzogJyArIGVuY29kaW5nKVxuICAgIH1cbiAgfSBlbHNlIGlmICh0eXBlb2YgdmFsID09PSAnbnVtYmVyJykge1xuICAgIHZhbCA9IHZhbCAmIDI1NVxuICB9XG5cbiAgLy8gSW52YWxpZCByYW5nZXMgYXJlIG5vdCBzZXQgdG8gYSBkZWZhdWx0LCBzbyBjYW4gcmFuZ2UgY2hlY2sgZWFybHkuXG4gIGlmIChzdGFydCA8IDAgfHwgdGhpcy5sZW5ndGggPCBzdGFydCB8fCB0aGlzLmxlbmd0aCA8IGVuZCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdPdXQgb2YgcmFuZ2UgaW5kZXgnKVxuICB9XG5cbiAgaWYgKGVuZCA8PSBzdGFydCkge1xuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICBzdGFydCA9IHN0YXJ0ID4+PiAwXG4gIGVuZCA9IGVuZCA9PT0gdW5kZWZpbmVkID8gdGhpcy5sZW5ndGggOiBlbmQgPj4+IDBcblxuICBpZiAoIXZhbCkgdmFsID0gMFxuXG4gIHZhciBpXG4gIGlmICh0eXBlb2YgdmFsID09PSAnbnVtYmVyJykge1xuICAgIGZvciAoaSA9IHN0YXJ0OyBpIDwgZW5kOyArK2kpIHtcbiAgICAgIHRoaXNbaV0gPSB2YWxcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgdmFyIGJ5dGVzID0gQnVmZmVyLmlzQnVmZmVyKHZhbClcbiAgICAgID8gdmFsXG4gICAgICA6IG5ldyBCdWZmZXIodmFsLCBlbmNvZGluZylcbiAgICB2YXIgbGVuID0gYnl0ZXMubGVuZ3RoXG4gICAgZm9yIChpID0gMDsgaSA8IGVuZCAtIHN0YXJ0OyArK2kpIHtcbiAgICAgIHRoaXNbaSArIHN0YXJ0XSA9IGJ5dGVzW2kgJSBsZW5dXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRoaXNcbn1cblxuLy8gSEVMUEVSIEZVTkNUSU9OU1xuLy8gPT09PT09PT09PT09PT09PVxuXG52YXIgSU5WQUxJRF9CQVNFNjRfUkUgPSAvW14rLzAtOUEtWmEtei1fXS9nXG5cbmZ1bmN0aW9uIGJhc2U2NGNsZWFuIChzdHIpIHtcbiAgLy8gTm9kZSBzdHJpcHMgb3V0IGludmFsaWQgY2hhcmFjdGVycyBsaWtlIFxcbiBhbmQgXFx0IGZyb20gdGhlIHN0cmluZywgYmFzZTY0LWpzIGRvZXMgbm90XG4gIHN0ciA9IHN0ci50cmltKCkucmVwbGFjZShJTlZBTElEX0JBU0U2NF9SRSwgJycpXG4gIC8vIE5vZGUgY29udmVydHMgc3RyaW5ncyB3aXRoIGxlbmd0aCA8IDIgdG8gJydcbiAgaWYgKHN0ci5sZW5ndGggPCAyKSByZXR1cm4gJydcbiAgLy8gTm9kZSBhbGxvd3MgZm9yIG5vbi1wYWRkZWQgYmFzZTY0IHN0cmluZ3MgKG1pc3NpbmcgdHJhaWxpbmcgPT09KSwgYmFzZTY0LWpzIGRvZXMgbm90XG4gIHdoaWxlIChzdHIubGVuZ3RoICUgNCAhPT0gMCkge1xuICAgIHN0ciA9IHN0ciArICc9J1xuICB9XG4gIHJldHVybiBzdHJcbn1cblxuZnVuY3Rpb24gdG9IZXggKG4pIHtcbiAgaWYgKG4gPCAxNikgcmV0dXJuICcwJyArIG4udG9TdHJpbmcoMTYpXG4gIHJldHVybiBuLnRvU3RyaW5nKDE2KVxufVxuXG5mdW5jdGlvbiB1dGY4VG9CeXRlcyAoc3RyaW5nLCB1bml0cykge1xuICB1bml0cyA9IHVuaXRzIHx8IEluZmluaXR5XG4gIHZhciBjb2RlUG9pbnRcbiAgdmFyIGxlbmd0aCA9IHN0cmluZy5sZW5ndGhcbiAgdmFyIGxlYWRTdXJyb2dhdGUgPSBudWxsXG4gIHZhciBieXRlcyA9IFtdXG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7ICsraSkge1xuICAgIGNvZGVQb2ludCA9IHN0cmluZy5jaGFyQ29kZUF0KGkpXG5cbiAgICAvLyBpcyBzdXJyb2dhdGUgY29tcG9uZW50XG4gICAgaWYgKGNvZGVQb2ludCA+IDB4RDdGRiAmJiBjb2RlUG9pbnQgPCAweEUwMDApIHtcbiAgICAgIC8vIGxhc3QgY2hhciB3YXMgYSBsZWFkXG4gICAgICBpZiAoIWxlYWRTdXJyb2dhdGUpIHtcbiAgICAgICAgLy8gbm8gbGVhZCB5ZXRcbiAgICAgICAgaWYgKGNvZGVQb2ludCA+IDB4REJGRikge1xuICAgICAgICAgIC8vIHVuZXhwZWN0ZWQgdHJhaWxcbiAgICAgICAgICBpZiAoKHVuaXRzIC09IDMpID4gLTEpIGJ5dGVzLnB1c2goMHhFRiwgMHhCRiwgMHhCRClcbiAgICAgICAgICBjb250aW51ZVxuICAgICAgICB9IGVsc2UgaWYgKGkgKyAxID09PSBsZW5ndGgpIHtcbiAgICAgICAgICAvLyB1bnBhaXJlZCBsZWFkXG4gICAgICAgICAgaWYgKCh1bml0cyAtPSAzKSA+IC0xKSBieXRlcy5wdXNoKDB4RUYsIDB4QkYsIDB4QkQpXG4gICAgICAgICAgY29udGludWVcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHZhbGlkIGxlYWRcbiAgICAgICAgbGVhZFN1cnJvZ2F0ZSA9IGNvZGVQb2ludFxuXG4gICAgICAgIGNvbnRpbnVlXG4gICAgICB9XG5cbiAgICAgIC8vIDIgbGVhZHMgaW4gYSByb3dcbiAgICAgIGlmIChjb2RlUG9pbnQgPCAweERDMDApIHtcbiAgICAgICAgaWYgKCh1bml0cyAtPSAzKSA+IC0xKSBieXRlcy5wdXNoKDB4RUYsIDB4QkYsIDB4QkQpXG4gICAgICAgIGxlYWRTdXJyb2dhdGUgPSBjb2RlUG9pbnRcbiAgICAgICAgY29udGludWVcbiAgICAgIH1cblxuICAgICAgLy8gdmFsaWQgc3Vycm9nYXRlIHBhaXJcbiAgICAgIGNvZGVQb2ludCA9IChsZWFkU3Vycm9nYXRlIC0gMHhEODAwIDw8IDEwIHwgY29kZVBvaW50IC0gMHhEQzAwKSArIDB4MTAwMDBcbiAgICB9IGVsc2UgaWYgKGxlYWRTdXJyb2dhdGUpIHtcbiAgICAgIC8vIHZhbGlkIGJtcCBjaGFyLCBidXQgbGFzdCBjaGFyIHdhcyBhIGxlYWRcbiAgICAgIGlmICgodW5pdHMgLT0gMykgPiAtMSkgYnl0ZXMucHVzaCgweEVGLCAweEJGLCAweEJEKVxuICAgIH1cblxuICAgIGxlYWRTdXJyb2dhdGUgPSBudWxsXG5cbiAgICAvLyBlbmNvZGUgdXRmOFxuICAgIGlmIChjb2RlUG9pbnQgPCAweDgwKSB7XG4gICAgICBpZiAoKHVuaXRzIC09IDEpIDwgMCkgYnJlYWtcbiAgICAgIGJ5dGVzLnB1c2goY29kZVBvaW50KVxuICAgIH0gZWxzZSBpZiAoY29kZVBvaW50IDwgMHg4MDApIHtcbiAgICAgIGlmICgodW5pdHMgLT0gMikgPCAwKSBicmVha1xuICAgICAgYnl0ZXMucHVzaChcbiAgICAgICAgY29kZVBvaW50ID4+IDB4NiB8IDB4QzAsXG4gICAgICAgIGNvZGVQb2ludCAmIDB4M0YgfCAweDgwXG4gICAgICApXG4gICAgfSBlbHNlIGlmIChjb2RlUG9pbnQgPCAweDEwMDAwKSB7XG4gICAgICBpZiAoKHVuaXRzIC09IDMpIDwgMCkgYnJlYWtcbiAgICAgIGJ5dGVzLnB1c2goXG4gICAgICAgIGNvZGVQb2ludCA+PiAweEMgfCAweEUwLFxuICAgICAgICBjb2RlUG9pbnQgPj4gMHg2ICYgMHgzRiB8IDB4ODAsXG4gICAgICAgIGNvZGVQb2ludCAmIDB4M0YgfCAweDgwXG4gICAgICApXG4gICAgfSBlbHNlIGlmIChjb2RlUG9pbnQgPCAweDExMDAwMCkge1xuICAgICAgaWYgKCh1bml0cyAtPSA0KSA8IDApIGJyZWFrXG4gICAgICBieXRlcy5wdXNoKFxuICAgICAgICBjb2RlUG9pbnQgPj4gMHgxMiB8IDB4RjAsXG4gICAgICAgIGNvZGVQb2ludCA+PiAweEMgJiAweDNGIHwgMHg4MCxcbiAgICAgICAgY29kZVBvaW50ID4+IDB4NiAmIDB4M0YgfCAweDgwLFxuICAgICAgICBjb2RlUG9pbnQgJiAweDNGIHwgMHg4MFxuICAgICAgKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgY29kZSBwb2ludCcpXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGJ5dGVzXG59XG5cbmZ1bmN0aW9uIGFzY2lpVG9CeXRlcyAoc3RyKSB7XG4gIHZhciBieXRlQXJyYXkgPSBbXVxuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0ci5sZW5ndGg7ICsraSkge1xuICAgIC8vIE5vZGUncyBjb2RlIHNlZW1zIHRvIGJlIGRvaW5nIHRoaXMgYW5kIG5vdCAmIDB4N0YuLlxuICAgIGJ5dGVBcnJheS5wdXNoKHN0ci5jaGFyQ29kZUF0KGkpICYgMHhGRilcbiAgfVxuICByZXR1cm4gYnl0ZUFycmF5XG59XG5cbmZ1bmN0aW9uIHV0ZjE2bGVUb0J5dGVzIChzdHIsIHVuaXRzKSB7XG4gIHZhciBjLCBoaSwgbG9cbiAgdmFyIGJ5dGVBcnJheSA9IFtdXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3RyLmxlbmd0aDsgKytpKSB7XG4gICAgaWYgKCh1bml0cyAtPSAyKSA8IDApIGJyZWFrXG5cbiAgICBjID0gc3RyLmNoYXJDb2RlQXQoaSlcbiAgICBoaSA9IGMgPj4gOFxuICAgIGxvID0gYyAlIDI1NlxuICAgIGJ5dGVBcnJheS5wdXNoKGxvKVxuICAgIGJ5dGVBcnJheS5wdXNoKGhpKVxuICB9XG5cbiAgcmV0dXJuIGJ5dGVBcnJheVxufVxuXG5mdW5jdGlvbiBiYXNlNjRUb0J5dGVzIChzdHIpIHtcbiAgcmV0dXJuIGJhc2U2NC50b0J5dGVBcnJheShiYXNlNjRjbGVhbihzdHIpKVxufVxuXG5mdW5jdGlvbiBibGl0QnVmZmVyIChzcmMsIGRzdCwgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7ICsraSkge1xuICAgIGlmICgoaSArIG9mZnNldCA+PSBkc3QubGVuZ3RoKSB8fCAoaSA+PSBzcmMubGVuZ3RoKSkgYnJlYWtcbiAgICBkc3RbaSArIG9mZnNldF0gPSBzcmNbaV1cbiAgfVxuICByZXR1cm4gaVxufVxuXG4vLyBBcnJheUJ1ZmZlcnMgZnJvbSBhbm90aGVyIGNvbnRleHQgKGkuZS4gYW4gaWZyYW1lKSBkbyBub3QgcGFzcyB0aGUgYGluc3RhbmNlb2ZgIGNoZWNrXG4vLyBidXQgdGhleSBzaG91bGQgYmUgdHJlYXRlZCBhcyB2YWxpZC4gU2VlOiBodHRwczovL2dpdGh1Yi5jb20vZmVyb3NzL2J1ZmZlci9pc3N1ZXMvMTY2XG5mdW5jdGlvbiBpc0FycmF5QnVmZmVyIChvYmopIHtcbiAgcmV0dXJuIG9iaiBpbnN0YW5jZW9mIEFycmF5QnVmZmVyIHx8XG4gICAgKG9iaiAhPSBudWxsICYmIG9iai5jb25zdHJ1Y3RvciAhPSBudWxsICYmIG9iai5jb25zdHJ1Y3Rvci5uYW1lID09PSAnQXJyYXlCdWZmZXInICYmXG4gICAgICB0eXBlb2Ygb2JqLmJ5dGVMZW5ndGggPT09ICdudW1iZXInKVxufVxuXG4vLyBOb2RlIDAuMTAgc3VwcG9ydHMgYEFycmF5QnVmZmVyYCBidXQgbGFja3MgYEFycmF5QnVmZmVyLmlzVmlld2BcbmZ1bmN0aW9uIGlzQXJyYXlCdWZmZXJWaWV3IChvYmopIHtcbiAgcmV0dXJuICh0eXBlb2YgQXJyYXlCdWZmZXIuaXNWaWV3ID09PSAnZnVuY3Rpb24nKSAmJiBBcnJheUJ1ZmZlci5pc1ZpZXcob2JqKVxufVxuXG5mdW5jdGlvbiBudW1iZXJJc05hTiAob2JqKSB7XG4gIHJldHVybiBvYmogIT09IG9iaiAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXNlbGYtY29tcGFyZVxufVxuIiwiZXhwb3J0cy5yZWFkID0gZnVuY3Rpb24gKGJ1ZmZlciwgb2Zmc2V0LCBpc0xFLCBtTGVuLCBuQnl0ZXMpIHtcbiAgdmFyIGUsIG1cbiAgdmFyIGVMZW4gPSBuQnl0ZXMgKiA4IC0gbUxlbiAtIDFcbiAgdmFyIGVNYXggPSAoMSA8PCBlTGVuKSAtIDFcbiAgdmFyIGVCaWFzID0gZU1heCA+PiAxXG4gIHZhciBuQml0cyA9IC03XG4gIHZhciBpID0gaXNMRSA/IChuQnl0ZXMgLSAxKSA6IDBcbiAgdmFyIGQgPSBpc0xFID8gLTEgOiAxXG4gIHZhciBzID0gYnVmZmVyW29mZnNldCArIGldXG5cbiAgaSArPSBkXG5cbiAgZSA9IHMgJiAoKDEgPDwgKC1uQml0cykpIC0gMSlcbiAgcyA+Pj0gKC1uQml0cylcbiAgbkJpdHMgKz0gZUxlblxuICBmb3IgKDsgbkJpdHMgPiAwOyBlID0gZSAqIDI1NiArIGJ1ZmZlcltvZmZzZXQgKyBpXSwgaSArPSBkLCBuQml0cyAtPSA4KSB7fVxuXG4gIG0gPSBlICYgKCgxIDw8ICgtbkJpdHMpKSAtIDEpXG4gIGUgPj49ICgtbkJpdHMpXG4gIG5CaXRzICs9IG1MZW5cbiAgZm9yICg7IG5CaXRzID4gMDsgbSA9IG0gKiAyNTYgKyBidWZmZXJbb2Zmc2V0ICsgaV0sIGkgKz0gZCwgbkJpdHMgLT0gOCkge31cblxuICBpZiAoZSA9PT0gMCkge1xuICAgIGUgPSAxIC0gZUJpYXNcbiAgfSBlbHNlIGlmIChlID09PSBlTWF4KSB7XG4gICAgcmV0dXJuIG0gPyBOYU4gOiAoKHMgPyAtMSA6IDEpICogSW5maW5pdHkpXG4gIH0gZWxzZSB7XG4gICAgbSA9IG0gKyBNYXRoLnBvdygyLCBtTGVuKVxuICAgIGUgPSBlIC0gZUJpYXNcbiAgfVxuICByZXR1cm4gKHMgPyAtMSA6IDEpICogbSAqIE1hdGgucG93KDIsIGUgLSBtTGVuKVxufVxuXG5leHBvcnRzLndyaXRlID0gZnVuY3Rpb24gKGJ1ZmZlciwgdmFsdWUsIG9mZnNldCwgaXNMRSwgbUxlbiwgbkJ5dGVzKSB7XG4gIHZhciBlLCBtLCBjXG4gIHZhciBlTGVuID0gbkJ5dGVzICogOCAtIG1MZW4gLSAxXG4gIHZhciBlTWF4ID0gKDEgPDwgZUxlbikgLSAxXG4gIHZhciBlQmlhcyA9IGVNYXggPj4gMVxuICB2YXIgcnQgPSAobUxlbiA9PT0gMjMgPyBNYXRoLnBvdygyLCAtMjQpIC0gTWF0aC5wb3coMiwgLTc3KSA6IDApXG4gIHZhciBpID0gaXNMRSA/IDAgOiAobkJ5dGVzIC0gMSlcbiAgdmFyIGQgPSBpc0xFID8gMSA6IC0xXG4gIHZhciBzID0gdmFsdWUgPCAwIHx8ICh2YWx1ZSA9PT0gMCAmJiAxIC8gdmFsdWUgPCAwKSA/IDEgOiAwXG5cbiAgdmFsdWUgPSBNYXRoLmFicyh2YWx1ZSlcblxuICBpZiAoaXNOYU4odmFsdWUpIHx8IHZhbHVlID09PSBJbmZpbml0eSkge1xuICAgIG0gPSBpc05hTih2YWx1ZSkgPyAxIDogMFxuICAgIGUgPSBlTWF4XG4gIH0gZWxzZSB7XG4gICAgZSA9IE1hdGguZmxvb3IoTWF0aC5sb2codmFsdWUpIC8gTWF0aC5MTjIpXG4gICAgaWYgKHZhbHVlICogKGMgPSBNYXRoLnBvdygyLCAtZSkpIDwgMSkge1xuICAgICAgZS0tXG4gICAgICBjICo9IDJcbiAgICB9XG4gICAgaWYgKGUgKyBlQmlhcyA+PSAxKSB7XG4gICAgICB2YWx1ZSArPSBydCAvIGNcbiAgICB9IGVsc2Uge1xuICAgICAgdmFsdWUgKz0gcnQgKiBNYXRoLnBvdygyLCAxIC0gZUJpYXMpXG4gICAgfVxuICAgIGlmICh2YWx1ZSAqIGMgPj0gMikge1xuICAgICAgZSsrXG4gICAgICBjIC89IDJcbiAgICB9XG5cbiAgICBpZiAoZSArIGVCaWFzID49IGVNYXgpIHtcbiAgICAgIG0gPSAwXG4gICAgICBlID0gZU1heFxuICAgIH0gZWxzZSBpZiAoZSArIGVCaWFzID49IDEpIHtcbiAgICAgIG0gPSAodmFsdWUgKiBjIC0gMSkgKiBNYXRoLnBvdygyLCBtTGVuKVxuICAgICAgZSA9IGUgKyBlQmlhc1xuICAgIH0gZWxzZSB7XG4gICAgICBtID0gdmFsdWUgKiBNYXRoLnBvdygyLCBlQmlhcyAtIDEpICogTWF0aC5wb3coMiwgbUxlbilcbiAgICAgIGUgPSAwXG4gICAgfVxuICB9XG5cbiAgZm9yICg7IG1MZW4gPj0gODsgYnVmZmVyW29mZnNldCArIGldID0gbSAmIDB4ZmYsIGkgKz0gZCwgbSAvPSAyNTYsIG1MZW4gLT0gOCkge31cblxuICBlID0gKGUgPDwgbUxlbikgfCBtXG4gIGVMZW4gKz0gbUxlblxuICBmb3IgKDsgZUxlbiA+IDA7IGJ1ZmZlcltvZmZzZXQgKyBpXSA9IGUgJiAweGZmLCBpICs9IGQsIGUgLz0gMjU2LCBlTGVuIC09IDgpIHt9XG5cbiAgYnVmZmVyW29mZnNldCArIGkgLSBkXSB8PSBzICogMTI4XG59XG4iLCIvLyBzaGltIGZvciB1c2luZyBwcm9jZXNzIGluIGJyb3dzZXJcbnZhciBwcm9jZXNzID0gbW9kdWxlLmV4cG9ydHMgPSB7fTtcblxuLy8gY2FjaGVkIGZyb20gd2hhdGV2ZXIgZ2xvYmFsIGlzIHByZXNlbnQgc28gdGhhdCB0ZXN0IHJ1bm5lcnMgdGhhdCBzdHViIGl0XG4vLyBkb24ndCBicmVhayB0aGluZ3MuICBCdXQgd2UgbmVlZCB0byB3cmFwIGl0IGluIGEgdHJ5IGNhdGNoIGluIGNhc2UgaXQgaXNcbi8vIHdyYXBwZWQgaW4gc3RyaWN0IG1vZGUgY29kZSB3aGljaCBkb2Vzbid0IGRlZmluZSBhbnkgZ2xvYmFscy4gIEl0J3MgaW5zaWRlIGFcbi8vIGZ1bmN0aW9uIGJlY2F1c2UgdHJ5L2NhdGNoZXMgZGVvcHRpbWl6ZSBpbiBjZXJ0YWluIGVuZ2luZXMuXG5cbnZhciBjYWNoZWRTZXRUaW1lb3V0O1xudmFyIGNhY2hlZENsZWFyVGltZW91dDtcblxuZnVuY3Rpb24gZGVmYXVsdFNldFRpbW91dCgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3NldFRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbmZ1bmN0aW9uIGRlZmF1bHRDbGVhclRpbWVvdXQgKCkge1xuICAgIHRocm93IG5ldyBFcnJvcignY2xlYXJUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG4oZnVuY3Rpb24gKCkge1xuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2Ygc2V0VGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2YgY2xlYXJUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgIH1cbn0gKCkpXG5mdW5jdGlvbiBydW5UaW1lb3V0KGZ1bikge1xuICAgIGlmIChjYWNoZWRTZXRUaW1lb3V0ID09PSBzZXRUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICAvLyBpZiBzZXRUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkU2V0VGltZW91dCA9PT0gZGVmYXVsdFNldFRpbW91dCB8fCAhY2FjaGVkU2V0VGltZW91dCkgJiYgc2V0VGltZW91dCkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dChmdW4sIDApO1xuICAgIH0gY2F0Y2goZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwobnVsbCwgZnVuLCAwKTtcbiAgICAgICAgfSBjYXRjaChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yXG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKHRoaXMsIGZ1biwgMCk7XG4gICAgICAgIH1cbiAgICB9XG5cblxufVxuZnVuY3Rpb24gcnVuQ2xlYXJUaW1lb3V0KG1hcmtlcikge1xuICAgIGlmIChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGNsZWFyVGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICAvLyBpZiBjbGVhclRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGRlZmF1bHRDbGVhclRpbWVvdXQgfHwgIWNhY2hlZENsZWFyVGltZW91dCkgJiYgY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCAgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbChudWxsLCBtYXJrZXIpO1xuICAgICAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yLlxuICAgICAgICAgICAgLy8gU29tZSB2ZXJzaW9ucyBvZiBJLkUuIGhhdmUgZGlmZmVyZW50IHJ1bGVzIGZvciBjbGVhclRpbWVvdXQgdnMgc2V0VGltZW91dFxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKHRoaXMsIG1hcmtlcik7XG4gICAgICAgIH1cbiAgICB9XG5cblxuXG59XG52YXIgcXVldWUgPSBbXTtcbnZhciBkcmFpbmluZyA9IGZhbHNlO1xudmFyIGN1cnJlbnRRdWV1ZTtcbnZhciBxdWV1ZUluZGV4ID0gLTE7XG5cbmZ1bmN0aW9uIGNsZWFuVXBOZXh0VGljaygpIHtcbiAgICBpZiAoIWRyYWluaW5nIHx8ICFjdXJyZW50UXVldWUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIGlmIChjdXJyZW50UXVldWUubGVuZ3RoKSB7XG4gICAgICAgIHF1ZXVlID0gY3VycmVudFF1ZXVlLmNvbmNhdChxdWV1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgIH1cbiAgICBpZiAocXVldWUubGVuZ3RoKSB7XG4gICAgICAgIGRyYWluUXVldWUoKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGRyYWluUXVldWUoKSB7XG4gICAgaWYgKGRyYWluaW5nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIHRpbWVvdXQgPSBydW5UaW1lb3V0KGNsZWFuVXBOZXh0VGljayk7XG4gICAgZHJhaW5pbmcgPSB0cnVlO1xuXG4gICAgdmFyIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB3aGlsZShsZW4pIHtcbiAgICAgICAgY3VycmVudFF1ZXVlID0gcXVldWU7XG4gICAgICAgIHF1ZXVlID0gW107XG4gICAgICAgIHdoaWxlICgrK3F1ZXVlSW5kZXggPCBsZW4pIHtcbiAgICAgICAgICAgIGlmIChjdXJyZW50UXVldWUpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50UXVldWVbcXVldWVJbmRleF0ucnVuKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgICAgICBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgfVxuICAgIGN1cnJlbnRRdWV1ZSA9IG51bGw7XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBydW5DbGVhclRpbWVvdXQodGltZW91dCk7XG59XG5cbnByb2Nlc3MubmV4dFRpY2sgPSBmdW5jdGlvbiAoZnVuKSB7XG4gICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCAtIDEpO1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgYXJnc1tpIC0gMV0gPSBhcmd1bWVudHNbaV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcXVldWUucHVzaChuZXcgSXRlbShmdW4sIGFyZ3MpKTtcbiAgICBpZiAocXVldWUubGVuZ3RoID09PSAxICYmICFkcmFpbmluZykge1xuICAgICAgICBydW5UaW1lb3V0KGRyYWluUXVldWUpO1xuICAgIH1cbn07XG5cbi8vIHY4IGxpa2VzIHByZWRpY3RpYmxlIG9iamVjdHNcbmZ1bmN0aW9uIEl0ZW0oZnVuLCBhcnJheSkge1xuICAgIHRoaXMuZnVuID0gZnVuO1xuICAgIHRoaXMuYXJyYXkgPSBhcnJheTtcbn1cbkl0ZW0ucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmZ1bi5hcHBseShudWxsLCB0aGlzLmFycmF5KTtcbn07XG5wcm9jZXNzLnRpdGxlID0gJ2Jyb3dzZXInO1xucHJvY2Vzcy5icm93c2VyID0gdHJ1ZTtcbnByb2Nlc3MuZW52ID0ge307XG5wcm9jZXNzLmFyZ3YgPSBbXTtcbnByb2Nlc3MudmVyc2lvbiA9ICcnOyAvLyBlbXB0eSBzdHJpbmcgdG8gYXZvaWQgcmVnZXhwIGlzc3Vlc1xucHJvY2Vzcy52ZXJzaW9ucyA9IHt9O1xuXG5mdW5jdGlvbiBub29wKCkge31cblxucHJvY2Vzcy5vbiA9IG5vb3A7XG5wcm9jZXNzLmFkZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3Mub25jZSA9IG5vb3A7XG5wcm9jZXNzLm9mZiA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUxpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlQWxsTGlzdGVuZXJzID0gbm9vcDtcbnByb2Nlc3MuZW1pdCA9IG5vb3A7XG5wcm9jZXNzLnByZXBlbmRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnByZXBlbmRPbmNlTGlzdGVuZXIgPSBub29wO1xuXG5wcm9jZXNzLmxpc3RlbmVycyA9IGZ1bmN0aW9uIChuYW1lKSB7IHJldHVybiBbXSB9XG5cbnByb2Nlc3MuYmluZGluZyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmJpbmRpbmcgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcblxucHJvY2Vzcy5jd2QgPSBmdW5jdGlvbiAoKSB7IHJldHVybiAnLycgfTtcbnByb2Nlc3MuY2hkaXIgPSBmdW5jdGlvbiAoZGlyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmNoZGlyIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5wcm9jZXNzLnVtYXNrID0gZnVuY3Rpb24oKSB7IHJldHVybiAwOyB9O1xuIiwiXG5cblxuZGVzY3JpYmUoXCJBIHN1aXRlXCIsIGZ1bmN0aW9uKCkge1xuICAgIGl0KFwiY29udGFpbnMgc3BlYyB3aXRoIGFuIGV4cGVjdGF0aW9uXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgZXhwZWN0KHRydWUpLnRvQmUodHJ1ZSk7XG4gICAgfSk7XG4gIH0pO1xuICBcbiAgIl19
