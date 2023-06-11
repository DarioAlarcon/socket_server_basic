const {io} = require('../index');
const Band = require('../models/band');
const Bands = require('../models/bands');

const bands = new Bands();
/*bands.addBand(new Band('Queen'));
bands.addBand(new Band('King'));
bands.addBand(new Band('Princess'));
bands.addBand(new Band('Duke'));
bands.addBand(new Band('Marquis'));*/
console.log(bands);

io.on('connection', client => {//socket comunication
    
    console.log('cliente conectado')
    client.emit('active-bands', bands.getBands());

    client.on('disconnect', () => { 
        console.log('cliente desconectado')
    });

    client.on('mensaje', (payload)=>{
        console.log('mensaje', payload);
        io.emit('mensaje',{admin: 'new message'})
    });

    client.on('vote-band', (payload)=>{
        console.log('vote band id', payload);
        bands.voteBand(payload.id);
        io.emit('active-bands', bands.getBands());
       

    })
    client.on('nuevo-mensaje', (payload)=>{
        client.broadcast.emit('nuevo-mensaje', payload)
    })
    client.on('add-band-to-list',(payload)=>{
        bands.addBand(new Band(payload.nombre));
        io.emit('active-bands', bands.getBands());
    })
    client.on('delete-band',(payload)=>{
        bands.deleteBands(payload.id);
        io.emit('active-bands', bands.getBands());
    })

});
