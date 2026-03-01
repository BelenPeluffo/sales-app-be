## Deploy
El BE está deployado en [Render](https://dashboard.render.com/web/srv-d6da3u7gi27c738erlg0). El deploy se ejecuta a mano, por el momento.

La idea sería crear una blueprint de Render, que no es otra cosa que un `.yaml`.

## DB
Motor: postgreSQL

La DB remota la tenemos levantada en [Neon](https://console.neon.tech/app/projects/billowing-hat-21553162/branches/br-muddy-morning-ac62o6vx/tables).

### Migraciones
Las migraciones deben correrse a mano desde local porque Render no permite comandos pre-deploy en su versión free.