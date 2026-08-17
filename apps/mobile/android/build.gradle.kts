allprojects {
    repositories {
        google()
        mavenCentral()
    }
}

val newBuildDir: Directory =
    rootProject.layout.buildDirectory
        .dir("../../build")
        .get()
rootProject.layout.buildDirectory.value(newBuildDir)

subprojects {
    val newSubprojectBuildDir: Directory = newBuildDir.dir(project.name)
    project.layout.buildDirectory.value(newSubprojectBuildDir)
}
subprojects {
    project.evaluationDependsOn(":app")
    
    val configureSubproject = {
        val extension = extensions.findByName("android")
        if (extension != null) {
            try {
                // Enforce SDK on all subproject plugins
                val setCompileSdkMethod = extension.javaClass.methods.firstOrNull { 
                    it.name == "setCompileSdkVersion" && it.parameterTypes.size == 1 && it.parameterTypes[0] == Int::class.javaPrimitiveType 
                }
                setCompileSdkMethod?.invoke(extension, 36)

                val setBuildToolsMethod = extension.javaClass.methods.firstOrNull { 
                    it.name == "setBuildToolsVersion" && it.parameterTypes.size == 1 && it.parameterTypes[0] == String::class.java 
                }
                setBuildToolsMethod?.invoke(extension, "36.0.0")

                // Inject namespace matching package from AndroidManifest.xml if missing
                val getNamespaceMethod = extension.javaClass.methods.firstOrNull { it.name == "getNamespace" }
                val currentNamespace = getNamespaceMethod?.invoke(extension) as? String
                if (currentNamespace.isNullOrEmpty()) {
                    var manifestPackage: String? = null
                    val manifestFile = project.file("src/main/AndroidManifest.xml")
                    if (manifestFile.exists()) {
                        val content = manifestFile.readText()
                        val match = Regex("""package\s*=\s*["']([^"']+)["']""").find(content)
                        manifestPackage = match?.groups?.get(1)?.value
                    }

                    val targetNamespace = manifestPackage 
                        ?: (if (project.group.toString().isNotEmpty()) project.group.toString() else "id.ac.cwe.sawitgo." + project.name.replace('-', '_'))

                    val setNamespaceMethod = extension.javaClass.methods.firstOrNull { 
                        it.name == "setNamespace" && it.parameterTypes.size == 1 && it.parameterTypes[0] == String::class.java 
                    }
                    setNamespaceMethod?.invoke(extension, targetNamespace)
                }
            } catch (_: Exception) {}
        }
    }

    if (state.executed) {
        configureSubproject()
    } else {
        afterEvaluate {
            configureSubproject()
        }
    }
}

tasks.register<Delete>("clean") {
    delete(rootProject.layout.buildDirectory)
}
