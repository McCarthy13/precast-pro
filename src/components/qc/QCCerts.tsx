
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Plus, FileText, Award } from "lucide-react";

const QCCerts = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Certificates</h2>
          <p className="text-gray-600">Material certificates for steel, strand, mesh, cement, and fly ash</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Upload Certificate
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          placeholder="Search certificates..."
          className="pl-10"
        />
      </div>

      <Tabs defaultValue="steel-certs" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="steel-certs">Steel Certs</TabsTrigger>
          <TabsTrigger value="strand-certs">Strand Certs</TabsTrigger>
          <TabsTrigger value="mesh-certs">Mesh Certs</TabsTrigger>
          <TabsTrigger value="cement-certs">Cement Certs</TabsTrigger>
          <TabsTrigger value="flyash-certs">Fly Ash Certs</TabsTrigger>
        </TabsList>

        <TabsContent value="steel-certs">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Award className="h-5 w-5 mr-2" />
                Steel Certificates
              </CardTitle>
              <CardDescription>Certificates for flat stock, angle, tube, rebar, and other steel materials</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">Steel certificate management coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="strand-certs">
          <Card>
            <CardHeader>
              <CardTitle>Strand Certificates</CardTitle>
              <CardDescription>Prestressing strand material certificates</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">Strand certificate management coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="mesh-certs">
          <Card>
            <CardHeader>
              <CardTitle>Mesh Certificates</CardTitle>
              <CardDescription>Type 1, Type 2, Type 3, and Type 4 mesh certificates</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">Mesh certificate management coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cement-certs">
          <Card>
            <CardHeader>
              <CardTitle>Cement Certificates</CardTitle>
              <CardDescription>Portland cement material certificates</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">Cement certificate management coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="flyash-certs">
          <Card>
            <CardHeader>
              <CardTitle>Fly Ash Certificates</CardTitle>
              <CardDescription>Fly ash material certificates and specifications</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">Fly ash certificate management coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default QCCerts;
