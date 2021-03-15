up:
	docker-compose up -d

down:
	docker-compose down

pact:
	npm run test:consumer

publish: pact
	npm run publish

verify:
	npm run test:provider
	npx pact-broker can-i-deploy --pacticipant bb-consumer --broker-base-url http://localhost:9292 --latest
	npx pact-broker can-i-deploy --pacticipant bb-provider --broker-base-url http://localhost:9292 --latest	