/**
 * Created by kj on 2018/2/2.
 */
//加载
function fnLoadGrids(){
    fnLoadGeo("../../SampleData/data.geojson",fnAttachMod);
}
var oGridDataSource;
//循环贴模型，UI加载
function fnAttachMod(datasource) {
    oGridDataSource = datasource;
    var entities = oGridDataSource.entities.values;
    for (var i = 0; i < entities.length; i++) {

        var entity = entities[i];
        if(!!entity.polygon){
            entity.grid="grid";
            entity.originShow=true;
            entity.searchShow=false;
            //添加到DOM


            entity.polygon.outline = false;
            entity.polygon.perPositionHeight = false;
            //console.log(entity.properties["颜色值"]._value);
            entity.polygon.material = new LSGlobe.Color.fromCssColorString(entity.properties["颜色值"]._value).withAlpha(0.4);

            //计算中心点
            if (!!entity.polygon.hierarchy._value.positions) {
                var aPos = entity.polygon.hierarchy._value.positions;
            } else {
                var aPos = entity.polygon.hierarchy._value;
            }

            var iX = 0, iY = 0, iZ = 0;
            for (var j = 0; j < aPos.length; j++) {
                iX = aPos[j].x + iX;
                iY = aPos[j].y + iY;
                iZ = aPos[j].z + iZ;
            }
            iX = iX / aPos.length;
            iY = iY / aPos.length;
            iZ = iZ / aPos.length;

            var WorlsPos = new LSGlobe.Cartesian3(iX, iY, iZ);
            var oDegree = viewer.scene.globe.ellipsoid.cartesianToCartographic(WorlsPos);
            var lat = LSGlobe.Math.toDegrees(oDegree.latitude);
            var lng = LSGlobe.Math.toDegrees(oDegree.longitude);
            var alt = oDegree.height;
            if(i<3){alt=-15;}
            var oLabelEntity = {
                name: entity.properties["名称"],
                position: LSGlobe.Cartesian3.fromDegrees(lng, lat, alt+40),
                id: "label" + entity.id,
                label: {
                    text: entity.properties["名称"],
                    translucencyByDistance: new LSGlobe.NearFarScalar(1.5e2, 2.0, 1.5e7, 0.5),
                    font: '25px Helvetica',
                    fillColor: LSGlobe.Color.BLACK,
                    outlineColor: LSGlobe.Color.BLACK,
                    outlineWidth: 4,
                    disableDepthTestDistance: 1000000000,
                    scale: 0.5,
                    showBackground: true,
                    backgroundColor: new LSGlobe.Color.fromCssColorString("rgba(255, 255, 255, 0.8)"),
                    backgroundPadding: new LSGlobe.Cartesian2(14, 10)
                }
            };
            oGridDataSource.entities.add(oLabelEntity);
        }
    }
}

 var aLable=[];
 var oCoord={};

 var labelIndex=0;
 function getDegree(){
 var oScreenCor = {x: parseInt(window.innerWidth / 2), y: parseInt(window.innerHeight / 2)};
 var posit = viewer.scene.pickGlobe(oScreenCor);
 console.log(oScreenCor,posit);
 var cartographic = LSGlobe.Cartographic.fromCartesian(posit);
 var currentClickLon = LSGlobe.Math.toDegrees(cartographic.longitude);
 var currentClickLat = LSGlobe.Math.toDegrees(cartographic.latitude);
 var currentClickHei = cartographic.height;
 var oCoordinate={};
 oCoordinate.x=currentClickLon;
 oCoordinate.y=currentClickLat;
 oCoordinate.z=currentClickHei;
 return oCoordinate;
 }/*
 var oTimer= setInterval(function(){
 if(labelIndex<aLable.length){
 viewer.flyTo(aLable[labelIndex],{duration:1,offset:new LSGlobe.HeadingPitchRange(0, -90, 0)});
 var n=labelIndex;
 setTimeout(function(){
 camera.zoomIn();
 camera.zoomOut();
 oCoord[aLable[n].name]=getDegree();
 },1500);

 labelIndex++;
 }
 },5000);*/