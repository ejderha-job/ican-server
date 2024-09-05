module.exports = {
    type:"postgres",
    host: "db",
    username: "postgres",
    password: "postgres",
    database: "postgres",
    port: 5432,
    entities: ["dist/**/*.entity.js"],
    synchronize: true,
    seeds: ['dist/seeds/**/*.js'],
    factories: ['dist/factories/**/*.js'],
}