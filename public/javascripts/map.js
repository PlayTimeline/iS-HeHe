(function() {
  var addMapControl, addMarker, createIcon, createInfoWindow, createMap, initMap, markerArr, setMapEvent;

  initMap = function() {
    createMap();
    setMapEvent();
    addMapControl();
    return addMarker();
  };

  createMap = function() {
    var map, point;
    map = new BMap.Map('map-content');
    point = new BMap.Point(106.524122, 29.577576);
    map.centerAndZoom(point, 17);
    return window.map = map;
  };

  setMapEvent = function() {
    map.enableDragging();
    map.enableScrollWheelZoom();
    map.enableDoubleClickZoom();
    return map.enableKeyboard();
  };

  addMapControl = function() {
    var ctrl_nav, ctrl_ove, ctrl_sca;
    ctrl_nav = new BMap.NavigationControl({
      anchor: BMAP_ANCHOR_TOP_LEFT,
      type: BMAP_NAVIGATION_CONTROL_LARGE
    });
    ctrl_ove = new BMap.OverviewMapControl({
      anchor: BMAP_ANCHOR_BOTTOM_RIGHT,
      isOpen: 1
    });
    ctrl_sca = new BMap.ScaleControl({
      anchor: BMAP_ANCHOR_BOTTOM_LEFT
    });
    map.addControl(ctrl_nav);
    map.addControl(ctrl_ove);
    return map.addControl(ctrl_sca);
  };

  markerArr = {
    title: "宇宙中心",
    content: "呵呵",
    point: "106.525173|29.577309",
    isOpen: 0,
    icon: {
      w: 21,
      h: 21,
      l: 0,
      t: 0,
      x: 6,
      lb: 5
    }
  };

  addMarker = function() {
    var i, iconImg, iw, json, label, marker, p0, p1, point, _i, _len, _results;
    _results = [];
    for (i = _i = 0, _len = markerArr.length; _i < _len; i = ++_i) {
      json = markerArr[i];
      p0 = json.point.split('|')[0];
      p1 = json.point.split('|')[1];
      point = new BMap.Point(p0, p1);
      iconImg = createIcon(json.icon);
      marker = new BMap.Marker(point, {
        icon: iconImg
      });
      iw = createInfoWindow(i);
      label = new BMap.Label(json.title, {
        "offset": new BMap.Size(json.icon.lb - json.icon.x + 10, -20)
      });
      marker.setLabel(label);
      map.addOverlay(marker);
      label.setStyle({
        borderColor: '#808080',
        color: '#333',
        cursor: 'pointer'
      });
      _results.push((function() {
        var index, _iw, _marker;
        index = i;
        _iw = createInfoWindow(i);
        _marker = marker;
        _marker.addEventListener('click', function() {
          return this.openInfoWindow(_iw);
        });
        _iw.addEventListener('open', function() {
          return _marker.getLabel().hide();
        });
        _iw.addEventListener('close', function() {
          return _marker.getLabel().show();
        });
        label.addEventListener('click', function() {
          return _marker.openInfoWindow(_iw);
        });
        if (json.isOpen) {
          label.hide();
          return _marker.openInfoWindow(_iw);
        }
      })());
    }
    return _results;
  };

  createInfoWindow = function(i) {
    var iw, json;
    json = markerArr[i];
    return iw = new BMap.InfoWindow("<b class='iw_poi_title' title='" + json.title + "'>" + json.title + "</b><div class='iw_poi_content'>" + json.content + "</div>");
  };

  createIcon = function(json) {
    var icon;
    return icon = new BMap.Icon('http://app.baidu.com/map/images/us_mk_icon.png', new BMap.Size(json.w, json.h), {
      imageOffset: new BMap.Size(-json.l, -json.t),
      infoWindowOffset: new BMap.Size(json.lb + 5, 1),
      offset: new BMap.Size(json.x, json.h)
    });
  };

  initMap();

}).call(this);
