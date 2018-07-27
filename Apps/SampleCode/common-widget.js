/**
 * Created by kj on 2018/2/6.
 */
//获取真实位置
function getRealPosition(Entities){

    var aPos=Entities.polygon.hierarchy._value.positions;

    var iX=0,iY=0,iZ=0,maxX=0,maxY=0,minX,minY,realheight;
    for(var i=0;i<aPos.length;i++){
        iX=aPos[i].x+iX;
        iY=aPos[i].y+iY;
        iZ=aPos[i].z+iZ;
    }
    iX=iX/aPos.length;
    iY=iY/aPos.length;
    iZ=iZ/aPos.length;

    //中心点经纬度
    var WorlsPos=new LSGlobe.Cartesian3(iX,iY,iZ);
    var oDegree=ellipsoid.cartesianToCartographic(WorlsPos);
    var lng=LSGlobe.Math.toDegrees(oDegree.longitude);
    var lat=LSGlobe.Math.toDegrees(oDegree.latitude);

    //遍历面所有点
    for(var a=0;a<aPos.length;a++){
        //当前点的经纬度
        var sWorlsPos=new LSGlobe.Cartesian3(aPos[a].x,aPos[a].y,aPos[a].z);
        var sDegree=ellipsoid.cartesianToCartographic(sWorlsPos);
        var slng=LSGlobe.Math.toDegrees(sDegree.longitude);
        var slat=LSGlobe.Math.toDegrees(sDegree.latitude);

        //当前点对象
        var oPos = {"x":slng,"y":slat};
        //到中心点距离

        var  currentheight = getDistance(oPos,lng,lat);
        if(a==0){
            realheight=currentheight
        }
        //取到中心点最大距离点
        if(realheight<currentheight){
            realheight=currentheight
        }
    }

    var alt=realheight*1.7320508075689+50 + tileset._boundingSphere.center.z*1+tileset._position.z*1;
    return {"lat":lat,"lng":lng,"alt":alt};
}
//距离
function getDistance(position,x,y){
    var radLatA = position.y*0.0174532925199432957692369077;
    var radLatB = y*0.0174532925199432957692369077;
    var radLonA = position.x*0.0174532925199432957692369077;
    var radLonB = x*0.0174532925199432957692369077;
    return Math.acos(
            Math.cos(radLatA)*Math.cos(radLatB)*Math.cos(radLonA-radLonB)+
            Math.sin(radLatA)*Math.sin(radLatB)) * 6378137;

}
//点在哪个实景
function whichTileset(x,y){
    var returnValue="";
    for(var i=0;i<viewer.scene.primitives.length;i++){
        var aTileSet = viewer.scene.primitives.get(i);
        if(aTileSet._type=="pageLOD"){
            var oCenter=aTileSet.tileBoundingSphere.center;
            var ellipsoid=viewer.scene.globe.ellipsoid;
            var cartesian3=new LSGlobe.Cartesian3(oCenter.x,oCenter.y,oCenter.z);
            var cartographic=ellipsoid.cartesianToCartographic(cartesian3);
            var lat=LSGlobe.Math.toDegrees(cartographic.latitude);
            var lng=LSGlobe.Math.toDegrees(cartographic.longitude);
            var position={x:lng,y:lat,z:cartographic.height};

            var distance = getDistance(position,x,y);
            if(distance<aTileSet.tileBoundingSphere.radius){
                returnValue=aTileSet;
            }
        }
    }
    return returnValue;
}
//动态获取GUID
function GetGuid() {
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";

    var uuid = s.join("");
    return uuid;
}
//获取geojson转化后的JSON
function fnGeoToJson(geourl){
    var geojsonUrl = geourl;
    var oJson;
    $.ajax(
        {
            url: geojsonUrl,
            type: "post",
            async: false,
            dataType: "JSON",
            success: function (result) {
                oJson = result;
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.error(textStatus);
            }
        });
    return oJson;
}

//加载geojson数据
function fnLoadGeo(geourl,callback){
    var options = {
        camera: viewer.scene.camera,
        canvas: viewer.scene.canvas,
        clampToGround: true,
        attachPolygon:true
    };
    var promise = LSGlobe.GeoJsonDataSource.load(geourl,options);
    promise.then(function(dataSource) {
        viewer.dataSources.add(dataSource);
        //回调
        if(!!callback){
            callback(dataSource);
        }
    }).otherwise(function(error) {
        console.error(error);
    });
}

//加载geojson数据
function fnLoadKML(kmlurl,callback){
    var options = {
        camera: viewer.scene.camera,
        canvas: viewer.scene.canvas,
        clampToGround: false,
        attachPolygon:true
    };
    var promise = LSGlobe.KmlDataSource.load(kmlurl,options);
    promise.then(function(dataSource) {
        viewer.dataSources.add(dataSource);
        //回调
        if(!!callback){
            callback(dataSource);
        }
    }).otherwise(function(error) {
        console.error(error);
    });
}
//加载geojson数据
function fnLoadHouseGeo(geourl,oPt,callback){
    var options = {
        camera: viewer.scene.camera,
        canvas: viewer.scene.canvas,
        clampToGround: true,
        attachPolygon:true
    };
    var promise = LSGlobe.GeoJsonDataSource.load(geourl,options);
    promise.then(function(dataSource) {
        viewer.dataSources.add(dataSource);
        //回调
        if(!!callback){
            callback(dataSource,oPt);
        }
    }).otherwise(function(error) {
        console.error(error);
    });
}
//加载geojson数据
function fnLoadMonitorGeo(geourl,oPt,callback){
    var options = {
        camera: viewer.scene.camera,
        canvas: viewer.scene.canvas,
        clampToGround: true,
        attachPolygon:true
    };
    var promise = LSGlobe.GeoJsonDataSource.load(geourl,options);
    promise.then(function(dataSource) {
        if(oPt=="1"){
            viewer.dataSources.add(dataSource);
        }
        //回调
        if(!!callback){
            callback(dataSource,oPt);
        }
    }).otherwise(function(error) {
        console.error(error);
    });
}
function fnAddTip(oText,callBack){
    var oTip=$("<div class='Copytip' style='transform: translate(-50%, -50%);position: fixed;left: 50%;top: 50%;background: #fff;border-radius: 2px;color: #666;font-size: 14px;line-height: 80px;height: 80px;width:290px;z-index: 99999;text-align: center;'>"+oText+"</div>");
    $("body").append(oTip);
    setTimeout(function(){
        oTip.fadeOut(300);
        if(callBack)(callBack());
    },2000);
}
//加载球完成后
var _selectedObject = undefined;
function fnAfterEarth(){
    handler.setInputAction(function (movement) {
        var Pos = scene.pickPositionWorldCoordinates(movement.position);

        //viewer.camera.pickEllipsoid(movement.position, ellipsoid);
        /*********************** 点击标注执行事件 start***************************/
        var pick = viewer.scene.pick(movement.position);

        if (LSGlobe.defined(pick)) {
            /*点击标注*/
            if (pick.id) {
                if ((oGridDataSource && oGridDataSource.entities.contains(pick.id))) {
                    //网格
                    var oEntity;
                    //网格面的id
                    var sId="";
                    if(pick.id.label){
                        //如果是标签
                        sId=pick.id.id.replace("label","");
                        oEntity=oGridDataSource.entities.getById(sId);
                        //对应的面高亮
                        var oColor=oEntity.polygon.material.color._value;
                        oEntity.polygon.material=LSGlobe.Color.fromCssColorString("rgb("+255*oColor.red+","+255*oColor.green+","+255*oColor.blue+")").withAlpha(0.9);
                    }else{
                        sId=pick.id.id;
                        oEntity= pick.id;
                    }
                    layer.config({
                        extend: 'myskin/style.css',
                        skin:"people-popover"
                    });
                    layer.open({
                    	id:sId+"gridpop",
                        type: 2, //Page层类型
                        title: oEntity.properties["名称"]._value,
                        shade: 0.01, //遮罩透明度
                        area: ['530px','450px'],
                        anim: -1, //0-6的动画形式，-1不开启
                        cancel:function(){fnRemoveLight(sId);},
                        content: 'pop-grid.html?gridguid='+oEntity.id
                    });

                    /*var oDescription = "<tr><td>属性名</td><td>属性值</td></tr>";
                     if (oEntity.properties != undefined) {

                     var flag = false;//判断没有自定义属性就不弹出弹框
                     for (var index = 0; index < value.properties.propertyNames.length; index++) {
                     var propertie = value.properties.propertyNames[index];
                     var values = value.properties[propertie]._value;

                     if (propertie != "marker-color" &&
                     propertie != "marker-size" &&
                     propertie != "title" &&
                     propertie != "fill" &&
                     propertie != "fill-opacity" &&
                     propertie != "stroke-opacity" &&
                     propertie != "stroke" &&
                     propertie != "stroke-width"
                     ) {
                     flag = true;
                     oDescription +=
                     "<tr>" +
                     "<td>" + propertie + "</td>" +
                     "<td>" + values + "</td>" +
                     "</tr>";
                     }
                     }
                     }*/
                    return;
                }else if(!!pick.id.markerType&&aPeopleType.indexOf(pick.id.markerType)>=0){
                    console.log(pick.id);
                    layer.config({extend: 'myskin/style.css',skin:"people-popover"});
                    layer.open({
                    	id:pick.id.id+"pop",
                        type: 2, //Page层类型
                        title: "人员信息",
                        shade: 0.01, //遮罩透明度
                        area: ['530px','385px'],
                        anim: -1, //0-6的动画形式，-1不开启
                        content:'people-info.html?peopleguid='+pick.id.id+"&peopletype="+pick.id.markerType
                    });
                }
            } else {
                console.log(pick.id);
            }
            /*********************** 点击标注执行事件 end***************************/
        }
        return false;
    }, LSGlobe.ScreenSpaceEventType.LEFT_CLICK);
    //TODO
    fnLoadGrids();
    fnLoadRoad();
    fnLoadPeople();
    fnInitHouse();
    fnInitEvent();
    fnInitMonitor();
    //划过
    function selectEntityChanged(value) {
        //没有划到过或当前的
        if (value != undefined && value === _selectedObject) {
            return;
        }
        //当前有保存的对象
        if (_selectedObject != undefined) {
            //当前有保存的对象且属于网格的面
            if (_selectedObject.polygon != undefined&&oGridDataSource.entities.contains(_selectedObject)) {
                var oColor=_selectedObject.polygon.material.color._value;
                _selectedObject.polygon.material=LSGlobe.Color.fromCssColorString("rgb("+255*oColor.red+","+255*oColor.green+","+255*oColor.blue+")").withAlpha(0.4);
            }
        }

        _selectedObject = value;
        //面选中时的风格
        if (value != undefined) {

            if (value.polygon != undefined&&oGridDataSource.entities.contains(_selectedObject)) {
                var oColor=value.polygon.material.color._value;
                value.polygon.material=LSGlobe.Color.fromCssColorString("rgb("+255*oColor.red+","+255*oColor.green+","+255*oColor.blue+")").withAlpha(0.9);
            }
        }
    }
    //viewer.selectedEntityChanged.addEventListener(selectEntityChanged);

}
//搜索
var aSearchEntity=[];
function fnSearchByKeyWord(sKeyword){
    var reg = new RegExp("[\\u4E00-\\u9FFF]+","g");
    /*用于存储结果的对象*/
    var aResult=[];
    /*单个对象格式
    var aResult = [
        {
            obj: "entity对象",
            according: "那个字段查询到的",
            value: "该字段的全部值",
            type:"point/polygon"
        }
    ]*/
    var oAllDatasource=viewer.dataSources;

    for(var i=0;i<oAllDatasource.length;i++){
        /*该次循环的datasource*/
        var oCurDatasource=oAllDatasource.get(i);
        if(!oCurDatasource.show){continue;}
        /*该次循环的datasource中的实体集合*/
        var aCurEntities=oCurDatasource.entities.values;
        for (var j = 0; j < aCurEntities.length; j++) {
            /*if(aCurEntities[j].properties){
                if("undefined"!=typeof(aCurEntities[j].properties["_名称"])){
                    if(aCurEntities[j].properties["_名称"]._value=="摄像头110"){
                        console.log(8888888888888);
                        alert(i);
                    }

                }
            }*/
            if(!aCurEntities[j]){continue;}
            var oCurResultByName={};
            //针对地标
            if(aCurEntities[j].road&&aCurEntities[j].name.indexOf(sKeyword)>=0){
                oCurResultByName["obj"]=aCurEntities[j];
                oCurResultByName.according="道路名";
                oCurResultByName.value=aCurEntities[j].name;
                oCurResultByName.type="point";
                oCurResultByName.EntityType="road";
                aResult.push(oCurResultByName);
            };
            /*该次对象的属性对象*/
            var oProperties= aCurEntities[j].properties;
            for (var itemProp in oProperties) {
                var oCurResultByProp={};
                /*过滤不重要的属性*/
                if (reg.test(itemProp)&&itemProp.indexOf("Subscription")<0) {
                    var sValue=oProperties[itemProp];
                    /*过滤掉方法*/
                    if("undefined"!=typeof(sValue._value)){
                        /*是否包含关键*/
                        if(sValue._value.toString().indexOf(sKeyword)>=0){
                            oCurResultByProp["obj"]=aCurEntities[j];
                            if(itemProp.charAt(0)!="_"){
                                oCurResultByProp.according=itemProp;
                            }else if(["0","1","2","3","4","5","6","7","8","9"].indexOf(itemProp.charAt(1))>=0){
                                oCurResultByProp.according=itemProp.substring(2);
                            }else {
                                oCurResultByProp.according=itemProp.substring(1);
                            }
                            /*属性值*/
                            oCurResultByProp.value=sValue._value;
                            if(aCurEntities[j].polygon){
                                oCurResultByProp.type="polygon";
                            }else if(aCurEntities[j].label||aCurEntities[j].point){
                                oCurResultByProp.type="point";
                            }
                            //对象名称
                            if(aCurEntities[j].Monitor){
                                /*监控*/
                                oCurResultByProp.EntityType="Monitor";
                                var oAllEntities = viewer.entities;
                                /*对应的entity*/
                                var oRelateEntity=oAllEntities.getById(aCurEntities[j].id);
                                //oRelateEntity.originShow=oRelateEntity.show;
                                oRelateEntity.show=true;
                                oRelateEntity.searchShow=true;
                                if(aSearchEntity.indexOf(oRelateEntity)<0){
                                    aSearchEntity.push(oRelateEntity);
                                }
                            }else if(aCurEntities[j].marker){

                                /*事件*/
                                oCurResultByProp.EntityType="marker";
                                var oAllEntities = viewer.entities;
                                /*对应的entity*/
                                var oRelateEntity=oAllEntities.getById(aCurEntities[j].id);
                                //oRelateEntity.originShow=oRelateEntity.show;
                                oRelateEntity.show=true;
                                oRelateEntity.searchShow=true;
                                if(aSearchEntity.indexOf(oRelateEntity)<0){
                                    aSearchEntity.push(oRelateEntity);
                                }
                            }else if(aCurEntities[j].house){

                                /*房屋*/
                                oCurResultByProp.EntityType="house";

                                /*对应的entity*/
                                var oRelateEntity=aCurEntities[j];
                                //oRelateEntity.originShow=oRelateEntity.show;
                                oRelateEntity.show=true;
                                oRelateEntity.searchShow=true;
                                if(aSearchEntity.indexOf(oRelateEntity)<0){
                                    aSearchEntity.push(oRelateEntity);
                                }
                            }else if(aCurEntities[j].people){
                                /*人员*/
                                if(!aCurEntities[j].billboard){
                                    //只存geojson插入的
                                    oCurResultByProp.EntityType="people";
                                    //人员
                                    for (var peopleType in oPeopleDatasource) {
                                        var curDataSource=oPeopleDatasource[peopleType];
                                        var curEntities=curDataSource.entities;

                                        /*对应的entity*/
                                        if(typeof(curEntities.getById(aCurEntities[j].id+"marker"))!='undefined'){
                                            var oRelateEntity=curEntities.getById(aCurEntities[j].id+"marker");

                                            //oRelateEntity.originShow=oRelateEntity.show;
                                            oRelateEntity.show=true;
                                            oRelateEntity.searchShow=true;
                                            if(aSearchEntity.indexOf(oRelateEntity)<0){
                                                aSearchEntity.push(oRelateEntity);
                                            }
                                        }
                                    }
                                }else{
                                    continue;
                                }
                            }else if(aCurEntities[j].grid){
                                aCurEntities[j].show=true;
                                aCurEntities[j].searchShow=true;
                                if(aSearchEntity.indexOf(aCurEntities[j])<0){
                                    aSearchEntity.push(aCurEntities[j]);
                                }
                                /*网格*/
                                oCurResultByProp.EntityType="grid";
                            }
                            aResult.push(oCurResultByProp);
                        }
                    }
                }
            }
        }


    };
    return aResult;
}
var aXiaoVSearch =[];
//智能小V
function smartSearch(type) {
    var oMessageBox =$(".message-box");
    var loadHtml="";
    loadHtml+="<div class=\"message-item\">";
    loadHtml+="   <i class=\"manage\"></i>";
    if(type==1){
        loadHtml+="   <div class=\"message-info message\" data-type=\"grid\">";
        var oEntities=oGridDataSource.entities.values;
        for (var i = 0; i < oEntities.length; i++) {
            var oEntity = oEntities[i];
            if(oEntity.properties){
                if(oEntity.properties["1总量"]<50){
                    oEntity.show=true;
                    oEntity.searchShow=true;
                    aXiaoVSearch.push(oEntity);
                    loadHtml+="      <p class=\"blue monitor\" id=\""+oEntity.id+"\">"+oEntity.properties["名称"]+"</p>";
                    //console.log(oEntity.properties["名称"]);
                }
            }
        }
    }else if(type==2){
        loadHtml+="   <div class=\"message-info message\" data-type=\"people\">";
        var oEntities=oPeopleDatasource["zhongdianqingshaonian"].entities.values;
        for (var i = 0; i < oEntities.length; i++) {
            var oEntity = oEntities[i];
            if(oEntity.properties){
                if(oEntity.properties["年龄"]<20&&oEntity.id.indexOf("marker")>=0){
                    oEntity.show=true;
                    oEntity.searchShow=true;
                    aXiaoVSearch.push(oEntity);
                    loadHtml+="      <p class=\"blue monitor\" id=\""+oEntity.id+"\">"+oEntity.properties["姓名"]+"</p>";
                }
            }
        }
    }else if(type==3){
        loadHtml+="   <div class=\"message-info message\" data-type=\"monitor\">";
        var oEntities=monitorGeojson.entities.values;
        for (var i = 0; i < oEntities.length; i++) {
            var oEntity = oEntities[i];
            if(oEntity.properties["好坏"]){
                var oTargetEntity=viewer.entities.getById(oEntity.id);
                oTargetEntity.show=true;
                oTargetEntity.searchShow=true;
                aXiaoVSearch.push(oTargetEntity);
                loadHtml+="      <p class=\"blue monitor\" id=\""+oEntity.id+"\">"+oEntity.properties["名称"]+"</p>";

            }
        }
    }else if(type==4){
        loadHtml+="   <div class=\"message-info message\" data-type=\"event\">";
        var oEntities=eventGeojson.entities.values;
        for (var i = 0; i < oEntities.length; i++) {
            var oEntity = oEntities[i];
            var oTargetEntity=viewer.entities.getById(oEntity.id);
            oTargetEntity.show=true;
            oTargetEntity.searchShow=true;
            aXiaoVSearch.push(oTargetEntity);
            loadHtml+="      <p class=\"blue monitor\" id=\""+oEntity.id+"\">"+oEntity.properties["事件名称"]+"</p>";

        }
    }
    loadHtml+="   </div>";
    loadHtml+="</div>";
    setTimeout(function(){
        oMessageBox.append(loadHtml);
        var ScrollTop = 236-oMessageBox.height()-30;
        var oMessageId =$("#message-box");
        oMessageId.find(".mCSB_container").animate({"top":ScrollTop+"px"},200);
        var oHeightBtn=oMessageId.height();
        var btnScrollTop =Math.round((oHeightBtn-(Math.round((Math.pow(oHeightBtn,2)/oMessageBox.height())))));
        oMessageId.find(".mCSB_dragger").animate({"top":btnScrollTop+"px"},200);
    },500);
}

//加载各种属性信息
function fnLoadGridPropInfo(gridnum,type,field){
    //请求哪个网格
    var sGridNum=gridnum;
    //请求数据类型
    var sType=type;
    //请求该类型下某种数据
    var sField=field;

    var fnChangeRed = function (sIs) {
        if ("是" == sIs) {
            return "<td class='red'>" + sIs + "</td>"
        } else {
            return "<td>" + sIs + "</td>"
        }
    };
    //表格
    var oData=fnGeoToJson("Datas/table/"+sGridNum+"/"+sType+".js");

    var tabContainer=$("#"+sType);
    tabContainer.show();
    if(""==sGridNum){
        $(".allpeopleChar").show();
        $("#graphical-chart .table-scroll").css("height","calc(100% - 25px)");
    }else{
        $(".allpeopleChar").hide();
        $("#graphical-chart .table-scroll").css("height","100%");
    }
    $("tbody",tabContainer).empty().parent("table").show().siblings().hide();
    for (var i = 0; i < oData.length; i++) {
        var sTr = "<tr>";
        if ("renyuan" == sType) {
            if (sField == "all" || oData[i][sField] =="是") {
                if(sField == "all" && gridnum==""){
                    sTr += "<td>" + oData[i]["网格"] + "</td>";
                }
            	//sTr += "<td>" + oData[i]["网格"] + "</td>";
                sTr += "<td>" + oData[i]["编号"] + "</td>";
                sTr += "<td>" + oData[i]["姓名"] + "</td>";
                sTr += "<td>" + oData[i]["公民身份证号"] + "</td>";
                sTr += "<td>" + oData[i]["性别"] + "</td>";
                sTr += "<td>" + oData[i]["民族"] + "</td>";
                sTr += "<td>" + oData[i]["住址"] + "</td>";
                sTr += "<td>" + oData[i]["婚姻状况"] + "</td>";
                sTr += "<td>" + oData[i]["文化程度"] + "</td>";
                sTr += "<td>" + oData[i]["政治面貌"] + "</td>";
                sTr += "<td>" + oData[i]["宗教信仰"] + "</td>";
                sTr += fnChangeRed(oData[i]["重点青少年"]);
                sTr += fnChangeRed(oData[i]["精神障碍者"]);
                sTr += fnChangeRed(oData[i]["刑满释放者"]);
                sTr += fnChangeRed(oData[i]["艾滋病患者"]);
                sTr += fnChangeRed(oData[i]["邪教人员"]);
                sTr += fnChangeRed(oData[i]["留守儿童"]);
                sTr += fnChangeRed(oData[i]["流动人口"]);
                sTr += "</tr>";
                $("tbody",tabContainer).append(sTr);
            }
        } else if ("diwu" == sType) {
            if (sField == "all" || oData[i]["地物类型"] == sField) {
                sTr += "<td>" + oData[i]["编号"] + "</td>";
                sTr += "<td>" + oData[i]["名称"] + "</td>";
                sTr += "<td>" + oData[i]["位置"] + "</td>";
                sTr += "<td>" + oData[i]["地物类型"] + "</td>";
                sTr += "<td>" + oData[i]["归属"] + "</td>";
                sTr += "<td>" + oData[i]["主要责任人"] + "</td>";
                sTr += "<td>" + oData[i]["责任人联系方式"] + "</td>";
                sTr += fnChangeRed(oData[i]["重点地物"]);

                sTr += "</tr>";
                $("tbody",tabContainer).append(sTr);
            }
        } else if ("fangwu" == sType) {
            if (sField == "all" || oData[i][sField] =="是") {
                sTr += "<td>" + oData[i]["编号"] + "</td>";
                sTr += "<td>" + oData[i]["名称"] + "</td>";
                sTr += "<td>" + oData[i]["位置"] + "</td>";
                sTr += "<td>" + oData[i]["建筑类型"] + "</td>";
                sTr += "<td>" + oData[i]["楼层类型"] + "</td>";
                sTr += "<td>" + oData[i]["建筑用途"] + "</td>";
                sTr += "<td>" + oData[i]["建筑责任人"] + "</td>";
                sTr += "<td>" + oData[i]["责任人联系方式"] + "</td>";
                sTr += fnChangeRed(oData[i]["高危楼房"]);
                sTr += fnChangeRed(oData[i]["待拆房屋"]);
                sTr += fnChangeRed(oData[i]["出租房屋"]);
                sTr += fnChangeRed(oData[i]["高危物品存放处"]);

                sTr += "</tr>";
                $("tbody",tabContainer).append(sTr);
            }
        } else if ("zuzhi" == sType) {
            if (sField == "all"||oData[i]["名称"].indexOf(sField)>-1) {
                sTr += "<td>" + oData[i]["编号"] + "</td>";
                sTr += "<td>" + oData[i]["名称"] + "</td>";
                sTr += "<td>" + oData[i]["组织成员数"] + "</td>";
                sTr += "<td>" + oData[i]["负责人"] + "</td>";
                sTr += "<td>" + oData[i]["联系方式"] + "</td>";
                sTr += fnChangeRed(oData[i]["重点组织"]);

                sTr += "</tr>";
                $("tbody",tabContainer).append(sTr);
            }
        }

    }
    if($("tbody tr",tabContainer).length<1){
        $("tbody",tabContainer).append("<td colspan='"+$("th",tabContainer).length+"'>暂无数据</td>");
    }

    $("#graphical-chart .allpeopleChar").off("click").click(function(){
        layer.config({
            extend: 'myskin/style.css',
            skin:"trouble-handle"
        });
        layer.open({
            type: 1, //Page层类型
            title: "人员统计图表",
            shade: 0.01, //遮罩透明度
            area: ['666px',  '515px'],
            anim: -1, //0-6的动画形式，-1不开启
            content:"<img alt='人员分析' src='images/char/people-char.png' width='664' height='478'>"
        });
    });
}

//去除高亮
function fnRemoveLight(polygonid){
    var oColor=oGridDataSource.entities.getById(polygonid).polygon.material.color._value;
    oGridDataSource.entities.getById(polygonid).polygon.material=LSGlobe.Color.fromCssColorString("rgb("+255*oColor.red+","+255*oColor.green+","+255*oColor.blue+")").withAlpha(0.4);
}