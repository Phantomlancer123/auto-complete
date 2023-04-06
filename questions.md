# 1. What is the difference between Component and PureComponent? give an example where it might break my app.

	The main difference between a regular component and a pure component is that a pure component implements a shallow comparison of its props and state to determine if it should re-render. If the new props and state are equal to the previous ones, then the component does not re-render.

	In summary, A component that needs to re-render frequently, or a larger application with many nested components, it's a good idea to use pure components to improve performance. However, A small component or a component that does not re-render frequently, a regular component may be sufficient.

# 2. Context + ShouldComponentUpdate might be dangerous. Can think of why is that?

	In React, the shouldComponentUpdate method is used to optimize performance by preventing unnecessary re-renders of a component. However, if the context is used inside the shouldComponentUpdate method, it can be dangerous because it can cause unexpected behavior or bugs. 
	This is because shouldComponentUpdate only performs a shallow comparison of props and state, but the context may have deeper changes that are not caught by this method. Therefore, it's recommended to avoid using context inside shouldComponentUpdate to ensure predictable and stable behavior.

	However, when we use Context and ShouldComponentUpdate together, it can be difficult to accurately determine when a component should re-render, since the context value can change at any time and trigger a re-render. This can lead to unexpected behavior and performance issues.

	For example, if we have a component that consumes context and implements ShouldComponentUpdate, and the context value changes frequently, it can lead to a situation where the component is constantly re-rendering, even if the component's props and state haven't changed. This can result in poor performance and a suboptimal user experience.

	To avoid these issues, it's best to use Context sparingly and only when necessary, and to carefully consider whether implementing ShouldComponentUpdate is necessary for each component.

# 3. Describe 3 ways to pass information from a component to its PARENT.

	Three ways to pass information from a component to its parent are:

	Props and callbacks: One of the most common ways to pass information from a child component to its parent is by passing data via props and triggering a callback function. In this approach, the parent component passes down a callback function as a prop to the child component. When the child component needs to pass data to the parent, it calls the callback function with the data as an argument.
	
	Using context: The child component can use context to share data with its parent and other descendant components without having to pass it explicitly through props.
	
	we can use global state like redux.

# 4. Give 2 ways to prevent components from re-rendering.

	Use React.memo(): The React.memo() higher-order component can be used to memoize a component and prevent it from re-rendering if its props haven't changed. React.memo() works by comparing the previous props with the new props, and only re-rendering the component if they have changed.

	Use shouldComponentUpdate(): The shouldComponentUpdate() lifecycle method can be used to manually control when a component should re-render. shouldComponentUpdate() receives the new props and state as arguments, and should return a boolean value indicating whether the component should re-render or not

# 5. What is a fragment and why do we need it? Give an example where it might break my app.

	In React, a fragment is a component that enables us to group a list of child elements without creating an additional DOM node. Fragments are utilized to enhance the performance and readability of React code by grouping multiple elements into a single parent element, without the need to add an extra element to the DOM.

# 6. Give 3 examples of the HOC pattern.

	withStyles: withStyles is a higher-order component (HOC) provided by the @material-ui/core library that enables us to apply custom styles to a React component using CSS-in-JS. This functionality permits the creation of reusable styles that can be applied to multiple components.

	connect: connect is a higher-order component (HOC) provided by the react-redux library that connects a React component to a Redux store. This connection allows the component to access the store's state and dispatch actions to update the state.

	withRouter: withRouter is a higher-order component (HOC) provided by React Router that provides the history, location, and match props to a wrapped component. This feature enables the wrapped component to access and manipulate the browser's URL history.

# 7. what's the difference in handling exceptions in promises, callbacks and async...await.

	Promises: Promises come with a catch method that we can use to handle exceptions. If a promise gets rejected, the catch method is triggered, and we can manage the error there.

	Callbacks: In the case of callbacks, error handling is often performed by passing an error object as the first argument to the callback function. If an error occurs, we can verify the existence of this argument and manage the error accordingly.

	Async/await: When utilizing async/await, we can implement a try/catch block to handle exceptions. If an exception is thrown in the try block, the catch block is executed, and we can manage the error there.

# 8. How many arguments does setState take and why is it async.

	The setState method in React is used to modify the state of a component, and it can take one or two arguments:

	This function requires two arguments: the previous state of the component and the current props of the component.

	The setState method works asynchronously, which means that React doesn't instantly update the state of the component. Instead, it schedules a state update and re-renders the component at a later time. This technique is used for performance reasons, as React can combine various state updates together to decrease the number of re-renders.

	Due to the asynchronous nature of setState, we can't depend on the updated state right after calling setState. Instead, we can provide a callback function as a second argument to setState that gets invoked after the state has been updated, and the component has been re-rendered.

# 9. List the steps needed to migrate a Class to Function Component.

	Create the function component: Generate a new function component with the identical name as the class component.

	Replace the render method with the function body: Replace the render method of the class component with the function body of the function component. This should return the JSX markup that the component displays.

	Move class methods to the function body: Move any class methods that are utilized in the render method to the function body of the function component.

	Replace this.state with useState hook: Replace the this.state calls with the useState hook. This necessitates importing the useState hook from React and utilizing it to establish state variables.

	Replace this.props with function arguments: Replace the this.props calls with function arguments.

	Remove lifecycle methods and use effect hook instead: Eliminate any lifecycle methods and replace them with the useEffect hook. This encompasses componentDidMount, componentDidUpdate, and componentWillUnmount.

# 10. List a few ways styles can be used with components

	Inline styles: To apply styles directly to elements, inline styles can be used by utilizing the style prop. An object that contains style properties and their values is passed to this prop.

	CSS Modules: CSS Modules is a technique that confines CSS styles to a particular component. This ensures that class names used in CSS are specific to that component only, avoiding name clashes with other components. To use CSS Modules, we need to enable them in our project and import the CSS file as a module.

	CSS-in-JS libraries: Writing CSS styles directly in JavaScript code is possible with CSS-in-JS libraries. These libraries generally provide a way to define style objects or components that generate CSS styles. Popular CSS-in-JS libraries include styled-components, emotion, and JSS.

	Third-party UI libraries: Pre-built components with predefined styles that are easily customizable are offered by many third-party UI libraries. Material-UI, Ant Design, and Bootstrap are some of the most widely used UI libraries.

# 11. How to render an HTML string coming from the server.

	To render an HTML string in React, the dangerouslySetInnerHTML prop can be used. However, it should be used with caution as it can be a security risk if the string is not properly sanitized. The prop enables setting the HTML content of a component using a string.
