(function() {
  var Candy = {};

  Candy.pixelRatio = (function() {
    // client browsers
    if (window && window.navigator && window.navigator.userAgent && !/PhantomJS/.test(window.navigator.userAgent)) {
      return 2;
    }
    // headless browsers
    else {
      return 1;
    }
  })();

  ////////////////////////////////////////////////////////////// WRAPPER //////////////////////////////////////////////////////////////
  
  Candy.Wrapper = function(config) {
    if (!config) {
      config = {};
    }
    this.width = config.width;
    this.height = config.height;
    this.layers = []; 

    this.container = document.createElement('div');
    this.container.className = 'candy-container';
    this.container.style.display = 'inline-block';
    this.setSize(this.width, this.height);

    // clear container
    config.container.innerHTML = '';
    config.container.appendChild(this.container);
  };

  Candy.Wrapper.prototype = {
    add: function(layer) {
      this.layers.push(layer);

      layer.setSize(layer.width || this.width, layer.height || this.height);

      this.container.appendChild(layer.container);
    },
    insert: function() {

    },
    setSize: function(width, height) {
      this.width = width;
      this.height = height;
      this.container.style.width = this.width + 'px';
      this.container.style.height = this.height + 'px';
    },
    clear: function() {
      this.clearScene();
      this.clearHit();
    },
    clearScene: function() {
      this.layers.forEach(function(layer) {
        layer.clearScene();
      });
    },
    clearHit: function() {
      this.layers.forEach(function(layer) {
        layer.clearHit();
      });
    },
    getIntersection: function() {

    },
    toImage: function() {

    },
    toCanvas: function() {

    },
    download: function() {

    },
    destroy: function() {

    }
  };

  ////////////////////////////////////////////////////////////// LAYER //////////////////////////////////////////////////////////////
  
  Candy.Layer = function(config) {
    if (!config) {
      config = {};
    }
    this.width = config.width || 0;
    this.height = config.height || 0;

    this.hitCanvas = new Candy.HitCanvas();
    this.sceneCanvas = new Candy.SceneCanvas();

    this.container = document.createElement('div');
    this.container.className = 'candy-layer';
    this.container.style.display = 'inline-block';
    this.container.style.position = 'relative';
    this.container.appendChild(this.hitCanvas.canvas);
    this.container.appendChild(this.sceneCanvas.canvas);

    if (this.width && this.height) {
      this.setSize(this.width, this.height);
    }
  };

  Candy.Layer.prototype = {
    setX: function(x) {
      this.container.style.left = x + 'px';
    },
    setY: function() {
      this.container.style.top = y + 'px';
    },
    setSize: function(width, height) {
      this.width = width;
      this.container.style.width = width + 'px';
      this.height = height;
      this.container.style.height = height + 'px';

      this.sceneCanvas.setSize(width, height);
      this.hitCanvas.setSize(width, height);
    },
    clear: function() {
      this.sceneCanvas.clear();
      this.hitCanvas.clear();
    },
    moveUp: function() {

    },
    moveDown: function() {

    },
    moveToTop: function() {

    },
    moveToBottom: function() {

    },
    moveTo: function() {

    },
    destroy: function() {

    }
  };

  ////////////////////////////////////////////////////////////// SCENE CANVAS //////////////////////////////////////////////////////////////
  
  Candy.SceneCanvas = function(config) {
    if (!config) {
      config = {};
    }

    this.width = config.width || 0;
    this.height = config.height || 0;

    this.canvas = document.createElement('canvas');
    this.canvas.className = 'candy-scene-canvas';
    this.canvas.style.display = 'inline-block';
    this.canvas.style.position = 'absolute';
    this.context = this.canvas.getContext('2d');

    if (this.width && this.height) {
      this.setSize(this.width, this.height);
    }
  };

  Candy.SceneCanvas.prototype = {
    setSize: function(width, height) {
      this.width = width;
      this.height = height;

      this.canvas.width = width * Candy.pixelRatio;
      this.canvas.style.width = width + 'px';
      this.canvas.height = height * Candy.pixelRatio;
      this.canvas.style.height = height + 'px'; 

      if (Candy.pixelRatio !== 1) {
        this.context.scale(Candy.pixelRatio, Candy.pixelRatio);
      }
    },
    clear: function() {
      this.context.clearRect(0, 0, this.width * Candy.pixelRatio, this.height * Candy.pixelRatio);
    },
    toImage: function(callback) {
      var that = this,
          dataURL = this.canvas.toDataURL(),
          imageObj = new Image();

      imageObj.onload = function() {
        imageObj.width = that.width;
        imageObj.height = that.height;
        callback(imageObj);
      };
      imageObj.src = dataURL;
    },
  };

  ////////////////////////////////////////////////////////////// HIT CANVAS //////////////////////////////////////////////////////////////
  
  Candy.HitCanvas = function(config) {
    if (!config) {
      config = {};
    }

    this.width = config.width || 0;
    this.height = config.height || 0;

    this.canvas = document.createElement('canvas');
    this.canvas.className = 'candy-hit-canvas';
    this.canvas.style.display = 'none';
    this.canvas.style.position = 'absolute';
    this.context = this.canvas.getContext('2d');

    if (this.width && this.height) {
      this.setSize(this.width, this.height);
    }
  };

  Candy.HitCanvas.prototype = {
    setSize: function(width, height) {
      this.width = width;
      this.height = height;

      this.canvas.width = width;
      this.canvas.style.width = width + 'px';
      this.canvas.height = height;
      this.canvas.style.height = height + 'px';
    },
    clear: function() {
      this.context.clearRect(0, 0, this.width, this.height);
    },
    getIntersection: function() {

    }
  };

  // export
  window.Candy = Candy;
})();