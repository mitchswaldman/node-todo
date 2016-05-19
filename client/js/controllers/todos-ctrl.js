angular.module('todoController', [])

	// inject the Todo service factory into our controller
	.controller('mainController', ['$scope','$http','Todos', function($scope, $http, Todos) {
		$scope.formData = {};
		$scope.loading = true;
	        $scope.review = "";
		var setTodos = function(todos){
		    $scope.todos = todos;
$scope.completedTodos = $scope.todos.filter(function(todo){return todo.completed;}).length;
                                $scope.snoozedTodos = $scope.todos.filter(function(todo){return todo.snoozed;}).length;
                                $scope.review = "You have completed " + $scope.completedTodos + " tasks and snoozed " + $scope.snoozedTodos + " tasks out of "+$scope.todos.length + " tasks.";
		}

	        // GET =====================================================================
		// when landing on the page, get all todos and show them
		// use the service to get all the todos
		Todos.get()
			.success(function(data) {
				setTodos(data);
				$scope.loading = false;
			});

		// CREATE ==================================================================
		// when submitting the add form, send the text to the node API
		$scope.createTodo = function() {

			// validate the formData to make sure that something is there
			// if form is empty, nothing will happen
			if ($scope.formData.text != undefined) {
				$scope.loading = true;

				// call the create function from our service (returns a promise object)
				Todos.create($scope.formData)

					// if successful creation, call our get function to get all the new todos
					.success(function(data) {
						$scope.loading = false;
						$scope.formData = {}; // clear the form so our user is ready to enter another
						setTodos(data); // assign our new list of todos
					});
			}
		};
	        
	        // UPDATE ==================
	        $scope.updateTodo = function(todo){
		    Todos.update(todo)
		         .success(function(data){
			      setTodos(data);
			 });
		};
	    
	        $scope.snoozeTodo = function(todo){
		    
			todo.snoozed = !todo.snoozed;
			$scope.updateTodo(todo);
		    
		}
	        // DLETE ====================
	        $scope.deleteTodo = function(todo){
		    Todos.deleteTodo(todo)
		         .success(function(data){
			     setTodos(data);
			 });
		};

	}]);
