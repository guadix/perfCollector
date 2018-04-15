(function () {
  //TODO: Fetch this from somewhere else
  const URL = 'http://10.54.0.168:3000/collector';
  //const UUID = '987iohdboijb087qw0b087cqbascuascc-';

  function Tardis() {
    const prepareData = (data, eventId, additionalData = {}) => {
      const result = Object.assign({}, {
        data,
        eventId,
      }, additionalData)

      return JSON.stringify(result);
    };
    const sentList = new Set();
    this.send = (eventId, additionalData = {}) => {
      const entries = performance.getEntries();
      navigator.sendBeacon(URL, prepareData(entries, eventId, additionalData));
    };
    
    this.sendBy = (eventId, entryType) => {
      const {geolocation, userAgent, connection} = navigator;
      const entries = performance.getEntriesByType(entryType);
      navigator.sendBeacon(URL, prepareData(entries, eventId, {client: { geolocation, userAgent, connection }}));
    };

    this.sendOnceBy = (app, eventId, entryType) => {
      if (!sentList.has(eventId)) {
        const entries = performance.getEntriesByType(entryType);
        const {geolocation, userAgent, connection} = navigator;
        navigator.sendBeacon(URL, prepareData(entries, eventId, {app, client: { geolocation, userAgent, connection }}));
        sentList.add(eventId);
      }
    };
    this.authenticate = () => {};
    
    this.collectMeasures = () => {
      const entries = performance.getEntriesByType('measure');
      if (entries.length) {
        navigator.sendBeacon(URL, prepareData(entries, 'router-transitions'));
        performance.clearMeasures();
      }
    };

    const init = () => {
      const {geolocation, userAgent, connection} = navigator;

      window.addEventListener('load', () => {
        console.log('Performance trigger: Load');
        this.send('custom-start', {client: { geolocation, userAgent, connection }});
      });
      window.addEventListener('beforeunload', () => {
        console.log('Performance trigger: custom-end-2');
        this.send('custom-end-2', {client: { geolocation, userAgent, connection }});
      });
      document.addEventListener('visibilityChange', () => {
        console.log('Performance trigger: custom-end-1');
        this.send('custom-end-1', {client: { geolocation, userAgent, connection }});
      });
    };
    init();
    //return an object holding the uuid and the send event. 
  };

  window.tardis = new Tardis();
})();