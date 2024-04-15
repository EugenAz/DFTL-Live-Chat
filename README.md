## The Document
**The document with descriptions of the solution proposal, risk assessment and architecture design are [here](./doc/SOLUTION.md).**

## PoC
### Installing dependencies 
Run:
```bash
./install.sh
```

### Running the whole thing
Run:
```bash
./start.sh
```

### Shortcuts, simplifications, skipped functionality
1. In both FE apps authentication was simplified to bare naive minimum:
`authUserName` is requested as a mandatory input upon the app start. The value is stored in a `localStorage` and treated as a UUID.
2. Implementation of persisting of the chat log is skipped. On the BE its responsibility would lie on the chat-service.
3. Implementation of a propper scalable state management in both FE apps is skipped. There's a simple `react-query` code. I would go for `redux`.
4. Meetings / Time CRUD operations / Time voting - is implemented solely to serve as a starting point for the live chat functionality. And hence are in the exremely reduced state both in functionality and in look-and-feel aspect.
5. Although the chat is in the focus of this repo, its functionality is minimal.
6. No tests are implemented.
