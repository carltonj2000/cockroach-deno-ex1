# Cockroach DB And Deno Example 1

```bash
deno run --allow-net --allow-read --allow-env hello.ts
# export .env lines on the cli via export <line> then
export COCKROACH_URL="postgresql://$COCKROACH_DB_SQL_USER:$COCKROACH_DB_SQL_PW@free-tier4.aws-us-west-2.cockroachlabs.cloud:26257/defaultdb?sslmode=verify-full&options=--cluster%3D$COCKROACH_DB_SQL_CLUSTER"
cockroach userfile upload data.mod.csv
cockroach userfile delete data.mod.csv
cockroach userfile list
```

## Code History

The code in this repository is based on the
[Combining 2 “Quick to Start” Technologies](https://medium.com/@mowinslow/cockroachdb-deno-combining-2-quick-to-start-technologies-5e516ba17435)
article.

```bash
curl -fsSL https://deno.land/install.sh | sh # installs deno
# install vscode deno extension from denoland
deno run --allow-net hello.ts
curl --create-dirs -o $HOME/.postgresql/root.crt -O https://cockroachlabs.cloud/clusters/<guid>/cert
# deno sslmode needs to be required not the cockroach provided mode of verify-full below
# might need to change defaultdb to <cluster>.defaultdb
postgresql://<usr>:<pw>@free-tier4.aws-us-west-2.cockroachlabs.cloud:26257/defaultdb?sslmode=verify-full&options=--cluster%3D<cluster>
curl https://binaries.cockroachdb.com/cockroach-v22.1.2.linux-amd64.tgz | tar -xz; sudo cp -i cockroach-v22.1.2.linux-amd64/cockroach /usr/local/bin/
cockroach sql --url "postgresql://<usr>@free-tier4.aws-us-west-2.cockroachlabs.cloud:26257/defaultdb?sslmode=verify-full&options=--cluster%3D<cluster>"
> show databases;
> CREATE TABLE dinosaurs (name VARCHAR(50), diet VARCHAR(20), link TEXT);
```

Get dinosaurs data.csv from https://github.com/kjanjua26/jurassic-park/blob/main/data/data.csv
Edit it down to data.mod.csv with only name, diet and link using https://edit-csv.net/

```bash
cockroach userfile upload data.mod.csv --url "postgresql://<usr>@free-tier4.aws-us-west-2.cockroachlabs.cloud:26257/defaultdb?sslmode=verify-full&options=--cluster%3D<cluster>"
IMPORT INTO dinosaurs (name, diet, link) CSV DATA('userfile://defaultdb.public.userfiles_<usr>/data.mod.csv');

```
