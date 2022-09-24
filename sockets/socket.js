const { io } = require("../index");
const Band = require("../models/band");
const Bands = require("../models/bands");

const bands = new Bands();

bands.addBand(new Band("Queen"));
bands.addBand(new Band("Opeth"));
bands.addBand(new Band("Metallica"));
bands.addBand(new Band("Porcupine Tree"));
console.log(bands);

// Mensajes de Sockets
io.on("connection", (client) => {
  console.log("Cliente conectado");

  client.emit("active-bands", bands.getBands());

  client.on("disconnect", () => {
    console.log("cliente desconectado");
  });

  client.on("mensaje", (payload) => {
    console.log("Mensaje!!!", payload);
    io.emit("mensaje", { admin: "Nuevo mensaje" });
  });

  client.on("emitir-mensaje", (payload) => {
    //io.emit('nuevo-mensaje', payload); // emite a todos
    client.broadcast.emit("emitir-mensaje", payload); // emite a todos menos el que lo emitió
  });

  client.on("vote-band", (payload) => {
    bands.voteBand( payload.id );
    io.emit("active-bands", bands.getBands());
  });

  client.on("add-band", (payload) => {
   const band = new Band( payload.name );
   bands.addBand( band );
   io.emit("active-bands", bands.getBands());
 });

 client.on("delete-band", (payload) => {
   
   bands.deleteBand( payload.id );
   io.emit("active-bands", bands.getBands());
 });
});
